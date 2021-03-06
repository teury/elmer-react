import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import CommentPlaceholder from "./CommentPlaceholder";
import CommentDetail from "./CommentDetail";
import { fetchComments } from "../actions/comments";

class CommentList extends Component {
  componentDidMount() {
    const { subject_slug } = this.props;
    this.props.fetchComments(subject_slug);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newComment) {
      this.props.comments.push(nextProps.newComment);
    }
  }

  render() {
    const { comments } = this.props;

    return (
      <React.Fragment>
        <div className="card" style={{ margin: "15px 0px" }}>
          <div className="card-header">Comments</div>
          <ul className="list-group list-group-flush" id="comments_container">
            {comments.length > 0 ? (
              comments.map((comment, index) => {
                return (
                  <ReactPlaceholder
                    showLoadingAnimation
                    delay={2000}
                    ready={this.props.ready}
                    customPlaceholder={CommentPlaceholder}>
                    <CommentDetail comment={comment} key={index} />
                  </ReactPlaceholder>
                );
              })
            ) : (
              <div style={{ padding: 15 }} id="no_comments">
                <h6 className="text-center">No comments to display</h6>
              </div>
            )}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

CommentList.propTypes = {
  fetchComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  comments: state.comments.comments,
  ready: state.comments.ready,
  newComment: state.comments.comment
});

export default connect(
  mapStateToProps,
  { fetchComments }
)(CommentList);
