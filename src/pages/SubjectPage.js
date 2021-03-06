import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import BoardCover from "../components/BoardCover";
import BoardInfo from "../components/BoardInfo";
import CommentList from "../components/CommentList";
import Subject from "../components/Subject";
import TrendingBoards from "../components/TrendingBoards";
import Footer from "../components/Footer";
import CommentForm from "../forms/CommentForm";
import { newComment } from "../actions/comments";

class SubjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board_details: {}
    };
  }

  componentDidMount() {
    document.title = `${this.props.match.params.board_slug} | Elmer`;
    fetch(`/api/frontboard/boards/${this.props.match.params.board_slug}/`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ board_details: json });
      });
  }

  submit = data => this.props.newComment(data);
  goToHomePage = () => this.props.history.push("/");

  render() {
    const { board_details } = this.state;
    return (
      <React.Fragment>
        <BoardCover cover_url={board_details.cover_url} />
        <div className="container content_block">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <PageHeading text={board_details.title} />
              <Subject
                slug={this.props.match.params.subject_slug}
                board_id={this.state.board_details.id}
                goToHomePage={this.goToHomePage}
              />
              <CommentList
                subject_slug={this.props.match.params.subject_slug}
              />
              <CommentForm
                submit={this.submit}
                slug={this.props.match.params.subject_slug}
              />
            </div>

            <div class="col-lg-4 col-md-4">
              <Link
                to="/new_post"
                className="btn btn-primary btn-block mt-4"
                role="button"
                title="Create new post"
                style={{ fontWeight: "bold", letterSpacing: "0.8px" }}>
                CREATE NEW POST
              </Link>
              <BoardInfo board_details={board_details} />
              <TrendingBoards />
              <Footer />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SubjectPage.propTypes = {
  newComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { newComment }
)(SubjectPage);
