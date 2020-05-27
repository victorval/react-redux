
// SECTION 1 Imports for container component
import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

// SECTION 2 Component declaration, pre-on-load and render
class ManageCoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses === 0) {
      actions.loadCourses().catch((err) => {
        alert("Loading courses failed " + err);
      });
    }

    if (authors === 0) {
      actions.loadAuthors().catch((err) => {
        alert("Loading authors failed " + err);
      });
    }
  }

  render() {
    return (
      <div>
        {" "}
        <h2>Manage Courses</h2>
      </div>
    );
  }
}

// SECTION 3 Prototypes declaration
ManageCoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

//SECTION 4 Redux mappings: state and actions to access in component
function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

// SECTION 5 connect
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
