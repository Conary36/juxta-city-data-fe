import axios from "axios";
import { axiosWithAuth } from "../../functions/axiosWithAuth";

const getSurveyData = async () => {
  const response = await axios.get(
    "https://whispering-chamber-14412.herokuapp.com/api/questions/surveyobj"
  );
  return response.data;
};

const putSurveyAnswers = async (answers, userId) => {
  axiosWithAuth()
    .put(
      `https://whispering-chamber-14412.herokuapp.com/api/profile/${userId}/answers`,
      answers
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export { getSurveyData, putSurveyAnswers };
