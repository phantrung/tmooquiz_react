import ModelAbstract from "../../../@Core/Api/ModelAbstract";
import {API_ADMIN_ROLE} from "./constants";

class Role extends ModelAbstract{
    constructor(props) {
        super(props);
        this.BASE_ENDPOINT = API_ADMIN_ROLE
        this.setRequest()
    }

}
const RoleModel = new Role()
export default RoleModel