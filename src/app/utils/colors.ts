export class ColorUtility {
    static getStatusColor(status) {
        if (status == "Shipped") {
            return "#00880A"; // green
        } else if (status == "In Transit") {
            return "#DDAA00"; // yellow
        } else {
            return "#000000"; // red
        }
    }
}
