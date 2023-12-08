class Rectangle {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    calculateCommonArea(otherRectangle) {
        // Знайдемо границі перетину по X та Y
        const xOverlap = Math.max(0, Math.min(this.x2, otherRectangle.x2) - Math.max(this.x1, otherRectangle.x1));
        const yOverlap = Math.max(0, Math.min(this.y2, otherRectangle.y2) - Math.max(this.y1, otherRectangle.y1));

        const commonArea = xOverlap * yOverlap;

        return commonArea;
    }


    calculateTotalArea(otherRectangle) {
        const area1 = this.calculateArea();
        const area2 = otherRectangle.calculateArea();

        const commonArea = this.calculateCommonArea(otherRectangle);

        // Сумарна площа без подвійного врахування загальної частини
        const totalArea = area1 + area2 - commonArea;

        return totalArea;
    }

    calculateArea() {
        const width = Math.abs(this.x2 - this.x1);
        const height = Math.abs(this.y2 - this.y1);
        return width * height;
    }

    compareAreas(otherRectangle) {
        const totalArea1 = this.calculateArea();
        const totalArea2 = otherRectangle.calculateArea();

        if (totalArea1 > totalArea2) {
            return "Площа прямокутника №1 більша";
        } else if (totalArea1 < totalArea2) {
            return "Площа прямокутника №2 більша";
        } else {
            return "Площі прямокутників рівні";
        }
    }
}

function calculateRectangles() {
    const inputRectangle1 = document.getElementById('rectangle1').value.split(',').map(Number);
    const inputRectangle2 = document.getElementById('rectangle2').value.split(',').map(Number);

    if (inputRectangle1.length !== 4 || inputRectangle2.length !== 4) {
        alert('Некоректно введені координати прямокутників.');
        return;
    }

    const rectangle1 = new Rectangle(inputRectangle1[0], inputRectangle1[1], inputRectangle1[2], inputRectangle1[3]);
    const rectangle2 = new Rectangle(inputRectangle2[0], inputRectangle2[1], inputRectangle2[2], inputRectangle2[3]);

    const commonArea = rectangle1.calculateCommonArea(rectangle2);
    const totalArea = rectangle1.calculateTotalArea(rectangle2);
    const comparisonResult = rectangle1.compareAreas(rectangle2);

    displayResults(commonArea, totalArea, comparisonResult);
}

function displayResults(commonArea, totalArea, comparisonResult) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = `<p>Площа загальної частини: ${commonArea}</p>`;
    resultsElement.innerHTML += `<p>Сумарна площа: ${totalArea}</p>`;
    resultsElement.innerHTML += `<p>Результат порівняння: ${comparisonResult}</p>`;
}