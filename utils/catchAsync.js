export default (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// const catchAsync = fn => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next); // কোন এরর হলে সরাসরি গ্লোবাল হ্যান্ডলারে পাঠিয়ে দিবে
//   };
// };
