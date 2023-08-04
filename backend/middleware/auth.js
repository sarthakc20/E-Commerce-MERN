const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const token  = req.cookies.ecomToken;    // This needs cookie-parser

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData);

    req.user = await User.findById(decodedData.id);

    next();
});


// For Admin Role 
exports.autherizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {  // The includes() method returns true if matched. Otherwise it returns false. The includes() method is case sensitive.
            return next(new ErrorHandler (
                `Role: ${req.user.role} is not allowed to access this resource`, 403
            ))
        }

        next();
    }
};

