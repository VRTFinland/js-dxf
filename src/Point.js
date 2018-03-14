class Point
{
    /**
     * @param {array} point - Center point  [x, y, z]
     */
    constructor(point)
    {
        this.point = point;
    }

    toDxfString()
    {
        // https://www.autodesk.com/techpubs/autocad/acadr14/dxf/point_al_u05_c.htm
        let s = `0\nPOINT\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.point[0]}\n20\n${this.point[1]}\n30\n${this.point[2]||0}\n`;
        return s;
    }
}

module.exports = Point;