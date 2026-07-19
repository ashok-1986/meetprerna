import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, Draggable);

  CustomEase.create("hop", "0.77, 0, 0.175, 1");
  CustomEase.create("smooth", "0.23, 1, 0.32, 1");
  CustomEase.create("drawer", "0.32, 0.72, 0, 1");
  CustomEase.create("snappy", "0.23, 1, 0.32, 1");
  CustomEase.create("expo", "0.19, 1, 0.22, 1");
  CustomEase.create("circ", "0.08, 0.82, 0.17, 1");
}

export { gsap, ScrollTrigger, CustomEase, SplitText, Draggable };