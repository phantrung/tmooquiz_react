class QuizHelper {

    static getColorRandom(){
        let color = [
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'teal',
            'indigo',
            'purple',
            'pink',
            'lime',
            'amber',
            'blue-gray',
            'cyan',
            ''
        ].sort(function(){ return Math.random()-0.5; });
        return color
    }
}
export default QuizHelper