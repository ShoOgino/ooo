import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Title.module.css";
import Link from "next/link";

const Title = (props) => {
  console.log(props);
  return <>タイトル {props.element}</>;
};
export default Title;
