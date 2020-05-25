import styled from "styled-components";
import { Card, Container } from "react-materialize";

export const LoginPageWrapper = styled(Container)`
.frame {
  border: #212121 2px solid;
} 
`
export const HomePageWrapper = styled(Container)`
.frame {
  border: #212121 2px solid;
}
.default-text {
      color: #bdbdbd;
    }
.home-main-placeholder {
  width: 500px;
  height: 275px;
}
.home-placeholder {
  width: 225px;
  height: 150px;
   }
   .title{
    color: #cfb53b;
   }
   hr.divider{
    width: 90%;
  }
`
export const MoviePageWrapper = styled(Container)`
.frame {
  border: #212121 2px solid;
}
.results-card {
  min-height: 31em;
  max-height: 38em;
  position: relative;
  top: 2em;
  border: solid 2px #212121;
  background-color: white;
}
.results-card-title {
  position: relative;
  bottom: 0.5em;
  margin: 0.75em 0 0.8em 0;
  font-size: 2em;
}
.backdrop-image {
  width: 300px;
  height: 165px;
  margin-left: 0.6em;
}
.result-btns {
  position: relative;
  bottom: 2.25em;
  left: 0.5em;
  margin-bottom: 0.75em;
}
.tmdb {
  width: 50px;
  height: 40px;
  float: right;
  position: relative;
  top: 2em;
  left: 2em;
}
.network-logo {
  width: 45px;
  height: 25px;
  float: right;
}
.poster {
  width: 90px;
  display: block;
  position: relative;
  right: 1.25em;
  bottom: 6.75em;
}
.overview {
  position: relative;
  bottom: 2.75em;
  width: 95%;
  min-height: 7.5em;
  max-height: 7.5em;
  overflow: hidden;
  text-overflow: ellipsis;
}
.details {
  position: relative;
  bottom: 0.5em;
  margin-left: 0.5em;
}
.stats,
.stats2 {
  position: relative;
  bottom: 7em;
  right: 2em;
}
.discover {
  min-height: 21em;
  max-height: 21em;
  border: solid 2px #212121;
}
.discover-related,
.trending {
  min-height: 21em;
  max-height: 21em;
  border: solid 2px #212121;
}
.trailers-default {
  min-height: 10em;
  max-height: 10em;
}
.related-images {
  width: 40px;
  height: 55px;
  position: relative;
  right: 1em;
  margin: 0 0;
}
.trending-title {
  position: relative;
  top: 10em;
  right: 0.75em;
}
.title{
 color: #cfb53b;
}
.favorite,
.notify,
.watch {
  margin-right: 0.4em;
  font-size: 1.15em;
}
.favorite,
.notify,
.watch, .remove{
  cursor: pointer;
  color: lightGray;
}
.remove {
  float: right;
}
.favorite:hover, .remove:hover {
  color: red;
}
.notify:hover,
.watch:hover {
  color: green;
}
`
export const CelebritiesPageWrapper = styled(Container)`
.frame {
  border: #212121 2px solid;
}
  .title{
    color: #cfb53b;
   }
.known,
.trending-celeb-images {
  width: 70px;
  height: 95px;
  float: left;
  margin-right: 0.5em;
  border: solid 2px #212121;
  color: #bdbdbd;
}
.celeb-profile-pic {
  width: 375px;
  height: 475px;
    border: solid 2px #212121;
}
.celeb-appearances-overview,
.celeb-biography,
.celeb-name,
.default-text {
  color: #bdbdbd;
}
.celeb-name{
  position: relative;
  bottom: .75em;
}
.biography-title, .appearances-title, .trending-celeb-title{
  color: #cfb53b;
  margin-bottom: 1em;
}
.celeb-result-btns {
  position: relative;
  bottom: 2.25em;
  left: 0.5em;
  margin-bottom: 0.75em;
}
.favorite,
.notify,
.watch {
  margin-right: 0.4em;
  font-size: 1.15em;
}
.favorite,
.notify,
.watch,
.remove {
  cursor: pointer;
  color: lightGray;
}
.remove {
  float: right;
}
.favorite:hover, .remove:hover {
  color: red;
}
.notify:hover,
.watch:hover {
  color: green;
}
`
export const ProfilePageWrapper = styled(Container)`
.frame {
  border: #212121 2px solid;
} 
`
export const RegisterPageWrapper = styled(Container)`
.frame {
  border: #212121 2px solid;
} 
`