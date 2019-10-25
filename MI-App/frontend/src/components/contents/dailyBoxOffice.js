import React, { useEffect } from "react";
import { connect } from "react-redux";
import { recentMovieInfo } from "../../actions/movieInfo";
import DailyMovie from "./dailyMovie";
import axios from "axios";

const DailyBoxOffice = props => {
  //어제날짜
  const dateInfo = () => {
    let nowDate = new Date();
    let yesterDate = nowDate.getTime() - 2 * 24 * 60 * 60 * 1000;
    nowDate.setTime(yesterDate);
    let dd = nowDate.getDate();
    let mm = nowDate.getMonth() + 1;
    let yyyy = nowDate.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    nowDate = yyyy.toString() + mm.toString() + dd.toString();
    return nowDate;
  };

  const getDailyMovie = async () => {
    let date = dateInfo();
    let url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=${date}`;
    let array = [];
    await axios
      .get(url)
      .then(response => {
        // console.log(response.data.boxOfficeResult.dailyBoxOfficeList);
        array.push(response.data.boxOfficeResult.dailyBoxOfficeList);
      })
      .catch(err => {
        console.log(err);
      });

    return array[0];
  };

  const boxOfficeDetail = async () => {
    const dailyMovie = await getDailyMovie();
    if (dailyMovie !== null) {
      dailyMovie.forEach(element => {
        function a() {
          props.recentMovieInfo(element.movieCd);
        }
        a();
      });
    }
  };

  useEffect(() => {
    boxOfficeDetail();
  }, []);

  return <DailyMovie></DailyMovie>;
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { recentMovieInfo }
)(DailyBoxOffice);