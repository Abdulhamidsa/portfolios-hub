const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      border: 0,
      clip: "rect(0, 0, 0, 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: 1,
    }}
  >
    {children}
  </span>
);

export { VisuallyHidden };
