const Avatar = ({ src, customStyle }) => {
  return (
    <img
      className={`${customStyle} rounded-full object-cover`}
      src={src}
      alt='thumbnail'
    />
  );
};

export default Avatar;
