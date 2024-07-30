import { expect } from "chai";
import { describe,it } from "mocha";
import { cleanObject,removeInactiveRoles} from "../src/add.js";

describe("#cleanObject",()=>{
    context("cleanObject()",()=>{
    it("should return an object with the same properties as the input object",()=>{
        const obj = {a:1,b:2,c:3};
        const result = cleanObject(obj);
        
        expect(result).to.deep.equal(obj)
    })
    it("Provide an object with some undefined values, it should return cleaned object with undefined values removed",()=>{
        const obj = {a:1,b:undefined,c:3};
        const result = cleanObject(obj,"",true);
        const expected={a:1,c:3}
        expect(result).to.deep.equal(expected);
    })
    it("Provide an object with some null values, it should return cleaned object with null values removed",()=>{
        const obj = {a:1,b:null,c:3};
        const result = cleanObject(obj,"c",true);
        const expected={a:1}
        expect(result).to.deep.equal(expected);
    })
    it("Provide an object with some fields starting with '_' e.g. _someField, it should return cleaned object with the _someField field removed.",()=>{
        const obj = {a:1,b:null,c:3,_someField:4};
        const result=cleanObject(obj,"",true)
        const expected={a:1,c:3}
        expect(result).to.deep.equal(expected)

    })
    it("Provide an object with a mixture of null & undefined values, it should return cleaned object with null & undefined values removed.",()=>{
        const obj={a:1,b:undefined,c:5,d:null,_e:5,_f:null}
        const result=cleanObject(obj,"a",true)
        const expected={c:5}
        expect(result).to.deep.equal(expected)
    })


});
})

describe("#removeInactive",()=>{
    context("removeInactiveRoles()",()=>{
        it("Provide an array of roles, with no inactive roles, should return the same data in return.",()=>{
            const role1 = {organizationPersonRoleId:"alpha", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"};
            const role2 = {organizationPersonRoleId:"bravo", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"};
            const role3 = {organizationPersonRoleId:"charlie", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"};
            const roles=[role1,role2,role3]
            const result=removeInactiveRoles(roles)
            expect(result).to.deep.equal(roles)
             })
        it("Provide an array of roles, with some inactive roles. should return an array of inactive roles removed",()=>{
            const role1 = {organizationPersonRoleId:"alpha", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"};
            const role3 = {organizationPersonRoleId:"charlie", roleDisplay:"developer" ,roleType:"inactive",individualPersonRoleId:"Website"};
           
            const roles=[role1,role3]
            const result=removeInactiveRoles(roles)
            const expected=[{organizationPersonRoleId:"alpha", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"}]
            expect(result).to.deep.equal(expected)
        })
        it("when roletype equals to null",()=>{
            const role1 = {organizationPersonRoleId:"alpha", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"};
            const role2 = {organizationPersonRoleId:"bravo", roleDisplay:"developer" ,roleType:null,individualPersonRoleId:"Website"};
            const role3 = {organizationPersonRoleId:"charlie", roleDisplay:"developer" ,roleType:"inactive",individualPersonRoleId:"Website"};
            const roles=[role1,role2,role3]
            const result=removeInactiveRoles(roles)
            const expected=[{organizationPersonRoleId:"alpha", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"}]
            expect(result).to.deep.equal(expected)
           
        })
        it("when roleDisplay equals to null",()=>{
            const role1 = {organizationPersonRoleId:"alpha", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"};
            const role2 = {organizationPersonRoleId:"bravo", roleDisplay:null ,roleType:"active",individualPersonRoleId:"Website"};
            const role3 = {organizationPersonRoleId:"charlie", roleDisplay:null ,roleType:"active",individualPersonRoleId:"Website"};
            const roles=[role1,role2,role3]
            const result=removeInactiveRoles(roles)
            const expected=[{organizationPersonRoleId:"alpha", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"}]
            expect(result).to.deep.equal(expected)
        })
        it("when roleType equals to null",()=>{
            const role1 = {organizationPersonRoleId:"alpha", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"};
            const role2 = {organizationPersonRoleId:"bravo", roleDisplay:"" ,roleType:null,individualPersonRoleId:"Website"};
            const role3 = {organizationPersonRoleId:"charlie", roleDisplay:"active" ,individualPersonRoleId:"Website"};
            const roles=[role1,role2,role3]
            const result=removeInactiveRoles(roles)
            const expected=[{organizationPersonRoleId:"alpha", roleDisplay:"developer" ,roleType:"active",individualPersonRoleId:"Website"}]
            expect(result).to.deep.equal(expected)

        })
    })
})


// describe("#calculateTotalprice()")




