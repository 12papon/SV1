const allowedOrigins = [
  "http://localhost:5173", // Vite এর ডিফল্ট পোর্ট
  "https://yourblogdomain.com", // আপনার প্রোডাকশন ডোমেইন
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(
        new Error("CORS নীতি অনুযায়ী এই সাইট থেকে রিকোয়েস্ট অনুমোদিত নয়!"),
      );
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE", "PETCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  //optionsSuccessStatus: 204,
};

export default corsOptions;
