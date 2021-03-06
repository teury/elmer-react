import React, { Component } from "react";
import { Link } from "react-router-dom";
import Linkify from "react-linkify";
import axios from "axios";

class Subject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: {},
      author: {}
    };
    this.star_subject = this.star_subject.bind(this);
  }

  componentDidMount() {
    const url = `/api/frontboard/subjects/${this.props.slug}`;
    axios.get(url).then(res => {
      this.setState({ subject: res.data, author: res.data.author });
    });
  }

  star_subject = (e, slug) => {
    axios
      .get(`/api/frontboard/actions/star/?subject_slug=${slug}`)
      .then(res => {
        let subject = { ...this.state.subject };
        subject.stars_count = res.data.total_points;
        subject.is_starred = res.data.is_starred;
        this.setState({ subject });
      });
  };

  deleteSubject = (e, slug) => {
    axios.delete(`/api/frontboard/subjects/${slug}`).then(res => {
      console.log(res);
      this.props.goToHomePage();
    });
  };

  reportSubject = (e, id) => {
    axios
      .post("/api/frontboard/reports/", {
        subject: id,
        board: this.props.board_id
      })
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const { subject } = this.state;
    return (
      <div className="card card-styling" style={{ border: 0 }}>
        <div className="card-body card-body-styling">
          <div className="star-partition">
            <span
              className="pointer"
              onClick={e => this.star_subject(e, this.state.subject.slug)}>
              {subject.is_starred === true ? (
                <i
                  className="fa fa-star fa-lg"
                  aria-hidden="true"
                  id="star_icon"
                />
              ) : (
                <i
                  className="fa fa-star-o fa-lg"
                  aria-hidden="true"
                  id="star_icon"
                />
              )}
              <br />
              <span>{subject.stars_count}</span>
            </span>
          </div>

          <div className="body-partition">
            <p className="post-info text-muted">
              <Link
                to={`/b/${subject.board_slug}`}
                title="visit board"
                className="board-link">
                b/{subject.board_slug}
              </Link>{" "}
              &bull; Posted by{" "}
              <Link to={`/u/${this.state.author.username}`} title="view profile" className="profile-link">
                {this.state.author.screen_name}
              </Link>
              <span> {subject.created_naturaltime}</span>
            </p>
            <h5>
              <Link
                to={`/s/${subject.board}/${subject.slug}`}
                className="card-link">
                {subject.title}
              </Link>
            </h5>
            <Linkify>
              <p>{subject.body}</p>
            </Linkify>

            {subject.photo !== null ? (
              <div className="card-photo-stlying">
                <img src={subject.photo} width="80%" alt={subject.title} />
              </div>
            ) : (
              ""
            )}

            <div className="card-bottom-area text-muted">
              <a href="/">
                <i className="fa fa-comment fa-md" aria-hidden="true" />{" "}
                {subject.comments_count} Comments
              </a>{" "}
              &bull;{" "}
              <a href="/" className="share_link" data-clipboard-text="">
                <i className="fa fa-share fa-md" aria-hidden="true" /> Share
              </a>
              <div style={{ float: "right" }}>
                {subject.is_author ? (
                  <React.Fragment>
                    <a href="/" title="edit subject">
                      <i class="fa fa-edit fa-lg" /> Edit
                    </a>{" "}
                    &bull;{" "}
                    <span
                      className="pointer"
                      onClick={e => this.deleteSubject(e, subject.slug)}>
                      <i class="fa fa-trash-o fa-lg" /> Delete
                    </span>
                  </React.Fragment>
                ) : (
                  <span
                    className="pointer"
                    onClick={e => this.reportSubject(e, subject.id)}>
                    <i class="fa fa-flag-o fa-lg" /> Report
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Subject;
