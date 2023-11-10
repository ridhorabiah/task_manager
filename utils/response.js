export const responseSuccess = (response, message, data, status=200) => {
  return response.status(200).json({
    status: status,
    message: message,
    data: data
  })
}

export const responseError = (response, message, status=400) => {
  return response.status(400).json({
    status: status,
    message: message
  })
}
