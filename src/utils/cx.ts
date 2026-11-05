// Joins the truthy class names: cx("card", active && "card--active")
export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
