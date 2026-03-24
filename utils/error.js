class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // এটি কি আমাদের তৈরি এরর নাকি প্রোগ্রামিং এরর তা বোঝার জন্য
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
