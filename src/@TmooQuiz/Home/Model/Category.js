import ModelAbstract from "../../../@Core/Api/ModelAbstract";
import {API_CATEGORIES} from "./constants";

class Category extends ModelAbstract{
    constructor(props) {
        super(props);
        this.BASE_ENDPOINT = API_CATEGORIES
        this.apiNotAuth = [API_CATEGORIES]
        this.setRequest()
    }

}
const CateModel = new Category()
export default CateModel