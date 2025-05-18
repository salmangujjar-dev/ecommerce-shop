import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSlashIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg aria-hidden="true" viewBox="0 0 6 20" ref={ref} {...props}>
    <path
      fill="currentColor"
      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgSlashIcon);
export default ForwardRef;
