// SECTION 1 Imports for container component
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

// SECTION 2 Component declaration, pre-on-load and render
function ManageCoursesPage({ courses, authors, loadAuthors, loadCourses }) {
  useEffect(() => {
    if (courses === 0) {
      loadCourses().catch((err) => {
        alert("Loading courses failed " + err);
      });
    }

    if (authors === 0) {
      loadAuthors().catch((err) => {
        alert("Loading authors failed " + err);
      });
    }
  }, []);

  return (
    <div>
      {" "}
      <h2>Manage Courses</h2>
    </div>
  );
}

// SECTION 3 Prototypes declaration
ManageCoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

//SECTION 4 Redux mappings: state and actions to access in component
function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  //this will bound call automatically for dispatch in component
  loadCourses,
  loadAuthors,
};

// SECTION 5 connect
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
