
/**
 * 诗词的服务js
 */

function getAnswers(){
  var answers = [
    { id: 0, title: "汗滴禾下土", answerType: "primary", success: false },
    { id: 1, title: "汉滴禾下土", answerType: "warn", success: false },
    { id: 2, title: "汗滴禾吓土", answerType: "warn", success: false },
    { id: 3, title: "汗滴禾下图", answerType: "warn", success: false },
    { id: 4, title: "汗弟禾下图", answerType: "warn", success: false }
  ];
  var prefix = ["A", "B", "C", "D", "E", "F", "G"];

  answers.sort(function(){
    return 0.5 - Math.random();
  });
  for (var i in answers){
    var item = answers[i];
    item.title = prefix[i] + ". " + item.title;
  }
  return answers;
}

module.exports={
  getAnswers: getAnswers
}
