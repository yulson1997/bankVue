/*
 * @Autor: yinfujun
 * @Description: 角色信息
 * @FilePath: \bosspay\src\model\QuickPayment\RoleInfoEntity.ts
 */

class RoleInfoEntity {
    // 角色组id
    private _roleId: string = ``;
    public get roleId(): string {
        return this._roleId;
    }
    public set roleId(value: string) {
        this._roleId = value ? value : ``;
    }
    // 角色组名称
    private _roleName: string = ``;
    public get roleName(): string {
        return this._roleName;
    }
    public set roleName(value: string) {
        this._roleName = value ? value : ``;
    }
    // 部门id
    private _orgId: string = ``;
    public get orgId(): string {
        return this._orgId;
    }
    public set orgId(value: string) {
        this._orgId = value ? value : ``;
    }
    // 备注
    private _mark: string = ``;
    public get mark(): string {
        return this._mark;
    }
    public set mark(value: string) {
        this._mark = value ? value : ``;
    }
    constructor(result: any) {
        this.roleId = result.roleId;
        this.roleName = result.roleName;
        this.orgId = result.orgId;
        this.mark = result.mark;
    }
}
export default RoleInfoEntity;