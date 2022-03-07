export const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

export const hasMixed = (number) =>
  new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

export const hasSpecial = (number) =>
  new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

export const strengthColor = (count) => {
  if (count < 3) return { label: "Poor", color: "#dc2626" };
  if (count < 6) return { label: "Weak", color: "#f59e0b" };
  if (count < 8) return { label: "Normal", color: "#06b6d4" };
  if (count < 10) return { label: "Good", color: "#99f6e4" };
  if (count < 12) return { label: "Strong", color: "#22c55e" };
  return { label: "Strong", color: "Strong" };
};

export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};

export const validateEmail = (email) =>
  new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email);
