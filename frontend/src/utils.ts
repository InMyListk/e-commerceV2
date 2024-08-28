export const getError = (error: {
  response: { data: { message: string } };
  message: string;
}) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
