import ModelAbstract from "../../../@Core/Api/ModelAbstract";
import {API_QUIZ} from "./constants";

class Quiz extends ModelAbstract{
    constructor(props) {
        super(props);
        this.BASE_ENDPOINT = API_QUIZ
        this.apiNotAuth = [this.BASE_ENDPOINT]
        this.setRequest()
    }

}
const QuizModel = new Quiz()
export default QuizModel