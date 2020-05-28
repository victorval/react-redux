// SECTION 1 Imports for container component
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";

// SECTION 2 Component declaration, pre-on-load and render
function ManageCoursesPage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((err) => {
        alert("Loading courses failed " + err);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((err) => {
        alert("Loading authors failed " + err);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;

    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }

  return (authors.length === 0) | (courses.length === 0) ? (
    <Spinner/>
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// SECTION 3 Prototypes declaration
ManageCoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// placed a selector directly from store
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

//SECTION 4 Redux mappings: state and actions to access in component
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  //this will bound call automatically for dispatch in component
  loadCourses,
  loadAuthors,
  saveCourse,
};

// SECTION 5 connect
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
