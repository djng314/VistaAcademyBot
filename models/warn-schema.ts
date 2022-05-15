import mongoose, { Schema } from 'mongoose'

const reqString = {
  type: String,
  required: true,
}

const schema = new Schema(
  {
    userId: reqString,
    guildId: reqString,
    reason: reqString,
    staffId: reqString,
  },
  {
    timestamps: true,
  }
)

const name = 'VA_warns'

// JAVASCRIPT:
// module.exports = mongoose.models[name] || mongoose.model(name, schema)

// TYPESCRIPT:
export default mongoose.models[name] || mongoose.model(name, schema)