import React, { useState, useEffect } from "react";
import "materialize-css";
import { Container, Row, Col } from "react-materialize";
import _ from "lodash";

import CelebSearchBar from "../../components/CelebSearchBar";
import DefaultCelebProfileImage from "../../components/CelebProfileImageDefault";
import DefaultCelebAppearances from "../../components/CelebAppearancesDefault";
import DefaultCelebBiography from "../../components/CelebBiographyDefault";
import DefaultTrendingCelebrities from "../../components/TrendingCelebritiesDefault";
import FavoriteCelebs from '../../components/FavoriteCelebs'
import FavoriteCelebsDefault from '../../components/FavoriteCelebsDefault'
import API from "../../utils/API";
import { user } from "../../utils/helpers";
import axios from "axios";
import $ from 'jquery';
import "./style.css";

const userId = user()._id;

const Celebrities = ({ celebrities, setCelebrities, token, communityCelebrities, setCommunityCelebrities }) => {

  const addFavorite = () => {
    const celebName = state.name;

    console.log("celebrities: ", celebrities);
    console.log("setCelebrities: ", setCelebrities);

    const newCelebList = celebrities.slice();
    newCelebList.push({
      celeb_name: celebName
    })
    setCelebrities(newCelebList);

    axios
      .put("/api/celebrities", { userId, celebName })
      .then((result) => {
        console.log("Adding celeb favorites...");

        axios
          .get('/api/celebrities')
          .then((response) => {
            console.log("Celeb page add favorite getCommunityCelebrities response data: ", response.data);
            setCommunityCelebrities(response.data);
          })

      })
      .catch((error) => {
        console.log(error);
      });


    $('.celeb-favorite-added').show()
    setTimeout(() => {
      $('.celeb-favorite-added').hide()
    }, 2000)

  };
  const setNotification = () => {
    alert('NOTIFICATION SET');
  };
  const watchContent = () => {
    alert('GO TO CONTENT PROVIDER');
  };
  const shareContent = () => {
    alert('CONTENT SHARED');
  };

  // Celebrities delete function

  function deleteCeleb(celebName) {

    const celebList = celebrities.slice();
    const newCelebList = celebList.filter(item => item.celeb_name !== celebName);
    setCelebrities(newCelebList);

    axios
      .delete(`/api/celebrities/${userId}/${celebName}`)
      .then((result) => {
        console.log("Deleting: ", celebName);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const [state, setState] = useState({
    userInput: "",
    name: "",
    profile_path: "",
    known_for: "",
    birthday: "",
    deathday: "",
    biography: "",
    media_type: "",
  });

  const { userInput } = state;
  const imageURL = "https://image.tmdb.org/t/p/w500";

  async function celebSearch(entry) {
    !entry ? alert("Enter a celebrity name.") : console.log('na');
    const mainData = await API.celebSearch(entry);
    if (!mainData.data.results[0]) {
      $('.celeb-search-fail').show()
      setTimeout(() => {
        $('.celeb-search-fail').hide()
      }, 2000)
      return;
    }
    $('.celeb-search-fail').hide();
    const searchInfo = mainData.data.results[0];
    const { id, name, profile_path, profile, media_type } = searchInfo;

    const celebrityDetails = await API.celebrityDetailsSearch(id);
    const celebrityDetailsInfo = celebrityDetails.data;

    const trendingCelebrities = await API.trendingCelebritiesSearch();
    const trendingCelebritiesInfo = trendingCelebrities.data;

    console.log("searchInfo ", searchInfo);
    console.log("name ", name);
    console.log("profile_path ", profile_path);
    console.log("profile ", profile);
    console.log("celebrityDetailsInfo ", celebrityDetailsInfo);
    console.log(`state: `, state);
    console.log("searchInfo[0]", celebrityDetailsInfo);

    setState({
      ...state,
      id: id,
      media_type: media_type,
      name: searchInfo.name,
      profile: profile_path != null ? `${imageURL}` + profile_path : 'https://via.placeholder.com/375x475/000000/FFFFFF/?text=NO IMAGE AVAILABLE',
      known1:
        searchInfo.known_for[0].media_type === "tv"
          ? searchInfo.known_for[0].name
          : searchInfo.known_for[0].title,
      known2:
        searchInfo.known_for[0].media_type === "tv"
          ? searchInfo.known_for[1].name
          : searchInfo.known_for[1].title,
      known1Img: `${imageURL}` + searchInfo.known_for[0].poster_path,
      known2Img: `${imageURL}` + searchInfo.known_for[1].poster_path,
      known3Img: `${imageURL}` + searchInfo.known_for[2].poster_path,
      known1Overview: searchInfo.known_for[0].overview,
      known2Overview: searchInfo.known_for[1].overview,
      known3Overview: searchInfo.known_for[2].overview,
      birth: celebrityDetailsInfo.birthday,
      death: celebrityDetailsInfo.deathday,
      biography: celebrityDetailsInfo.biography,

      trending1: trendingCelebritiesInfo.results[0].name,
      trending2: trendingCelebritiesInfo.results[1].name,
      trending3: trendingCelebritiesInfo.results[2].name,
      trending4: trendingCelebritiesInfo.results[3].name,
      trending5: trendingCelebritiesInfo.results[4].name,
      trending1Img:
        `${imageURL}` + trendingCelebritiesInfo.results[0].profile_path,
      trending2Img:
        `${imageURL}` + trendingCelebritiesInfo.results[1].profile_path,
      trending3Img:
        `${imageURL}` + trendingCelebritiesInfo.results[2].profile_path,
      trending4Img:
        `${imageURL}` + trendingCelebritiesInfo.results[3].profile_path,
      trending5Img:
        `${imageURL}` + trendingCelebritiesInfo.results[4].profile_path,
    });
    console.log("known1", searchInfo.known_for[0].title);
    console.log("known2", searchInfo.known_for[1].title);
    console.log("trending1", trendingCelebritiesInfo.results[0]);
    console.log(
      "THIS ",
      `${imageURL}` + trendingCelebritiesInfo.results[0].profile_path
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    celebSearch(userInput);
    $('.search-input-box').val('');

  };

  // hardcoded communityCelebrities

  // const communityCelebrities = [
  //   {
  //     celeb_name: "Dwayne Johnson"
  //   },
  //   {
  //     celeb_name: "Taylor Swift"
  //   },
  //   {
  //     celeb_name: "Liam Neeson"
  //   }
  // ];

  useEffect(() => {
    axios
      .get('/api/celebrities')
      .then((response) => {
        console.log("Celeb page getCommunityCelebrities response data: ", response.data);
        setCommunityCelebrities(response.data);
      })
  }, []);

  useEffect(() => {
    const existingFavoriteCeleb = celebrities.filter((el) => el.celeb_name === state.name)
    existingFavoriteCeleb.length > 0 ? ($('.favorite').hide()) : ($('.favorite').show());
  }, [celebrities]);
  console.log('celebrities', celebrities)
  return (
    <Container>
    <Row>
      <Col m={4}></Col>
      <Col m={4}>
        <>
          <div className='celeb-search-fail'>No results found for <strong>{userInput.toUpperCase()}</strong>.</div>
          <CelebSearchBar
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        </>
      </Col>
      <Col m={4}></Col>
    </Row>

    <Row>
      <Col m={5}>
        {state.name ? (
          <>
            <img
              className="celeb-profile-pic"
              src={state.profile}
              alt={state.name}
            />
            {token ? (
              <div className='result-btns'>
                <span onClick={addFavorite}>
                  <span className='material-icons favorite'>favorite</span>
                </span>
                <span onClick={setNotification}>
                  <span className='material-icons notify'>notifications</span>
                </span>
                <span onClick={watchContent}>
                  <span className='material-icons watch'>tv</span>
                </span>
                <span onClick={shareContent}>
                  <span className='material-icons watch'>share</span>
                </span>
                <div className='celeb-favorite-added'><strong>{state.name.toUpperCase()}</strong> added to favorites</div>
              </div>
            ) : (
                console.log('User is not logged in.')
              )}

          </>
        ) : (
            <DefaultCelebProfileImage />
          )}
      </Col>
      <Col m={4}>
        {state.name ? (
          <h2 className="celeb-name">{state.name}</h2>
        ) : (
            <h2 className="celeb-name">Celebrities</h2>
          )}

        {state.name ? (
          <>
            <h6 className="biography-title">Biography</h6>
            <p className="celeb-biography">
              {_.truncate(state.biography, {
                length: 300,
                separator: "...",
              })}
            </p>
            <h6 className="appearances-title">Appearances</h6>
            <a href={state.known1Img}>
              <img
                className="known"
                src={state.known1Img}
                alt="{state.known1}"
              />
            </a>
            <p className="celeb-appearances-overview">
              {_.truncate(state.known1Overview, {
                length: 140,
                separator: "...",
              })}
            </p>
            <a href={state.known2Img}>
              <img
                className="known"
                src={state.known2Img}
                alt="{state.known2}"
              />
            </a>
            <p className="celeb-appearances-overview">
              {_.truncate(state.known2Overview, {
                length: 140,
                separator: "...",
              })}
            </p>
            <a href={state.known3Img}>
              <img
                className="known"
                src={state.known3Img}
                alt="{state.known3}"
              />
            </a>
            <p className="celeb-appearances-overview">
              {_.truncate(state.known3Overview, {
                length: 140,
                separator: "...",
              })}
            </p>
          </>
        ) : (
            <>
              <DefaultCelebBiography />
              <DefaultCelebAppearances />
            </>
          )}
      </Col>
      <Col m={3}>
        {token ? (
          <>

            <FavoriteCelebsDefault heading={'COMMUNITY FAVORITES'} communityCelebrities={communityCelebrities} setCommunityCelebrities={setCommunityCelebrities} celebSearch={celebSearch} />
            <FavoriteCelebs heading={'MY PEOPLE'} deleteCeleb={deleteCeleb} celebrities={celebrities} setCelebrities={setCelebrities} celebSearch={celebSearch} />

          </>
        ) : (
            <>
              <FavoriteCelebsDefault heading={'COMMUNITY FAVORITES'} communityCelebrities={communityCelebrities} setCommunityCelebrities={setCommunityCelebrities} celebSearch={celebSearch} />
            </>
          )}

        <br></br>

        {state.name ? (
          <>
            <h6 className="trending-celeb-title">Trending</h6>
            <img
              className="trending-celeb-images"
              src={state.trending1Img}
              title={state.trending1}
              alt={state.trending1}
            />
            <img
              className="trending-celeb-images"
              src={state.trending2Img}
              title={state.trending2}
              alt={state.trending2}
            />
            <img
              className="trending-celeb-images"
              src={state.trending3Img}
              title={state.trending3}
              alt={state.trending3}
            />
            <img
              className="trending-celeb-images"
              src={state.trending4Img}
              title={state.trending4}
              alt={state.trending4}
            />
            <img
              className="trending-celeb-images"
              src={state.trending5Img}
              title={state.trending5}
              alt={state.trending5}
            />
          </>
        ) : (
            <DefaultTrendingCelebrities />
          )}
      </Col>
    </Row>
    </Container>
  );
};

export default Celebrities;