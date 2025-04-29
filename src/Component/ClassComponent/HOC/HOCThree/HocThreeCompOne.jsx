import { withFancyText } from "./WithFancyText";

const HocThreeCompOne = (props) => <p>{props.text}</p>;

export default withFancyText(HocThreeCompOne)