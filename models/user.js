const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
		avatar: String,
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (_doc, ret) => {
				delete ret.passward;
				return ret;
			},
		},
	}
);

// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
// });

module.exports = mongoose.model('User', userSchema);
