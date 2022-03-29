/*
 * @Author: yinfu
 * @Date: 2020-11-02 10:27:25
 * @LastEditTime: 2020-11-02 10:59:32
 * @Description: 
 */
class RequestParam {
    private pageIndex: number = 0;
    public get _pageIndex(): number {
        return this.pageIndex;
    }
    public set _pageIndex(value: number) {
        this.pageIndex = value ? value : 0;
    }

    private pageNumber: number = 0;
    public get _pageNumber(): number {
        return this.pageNumber;
    }
    public set _pageNumber(value: number) {
        this.pageNumber = value ? value : 0;
    }

    constructor(result: any) {
        this.pageIndex = result.pageIndex;
        this.pageNumber = result.pageNumber;
    }
}
export default RequestParam;
