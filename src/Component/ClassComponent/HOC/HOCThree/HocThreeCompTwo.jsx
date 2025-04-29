import { withFancyText } from "./WithFancyText";

const HocThreeCompTwo = (props) => <p>{props.text}</p>;

export default withFancyText(HocThreeCompTwo)