import mongoose, { PaginateModel } from "mongoose";
const mongoosePaginate = require('mongoose-paginate-v2');

// An interface that describes the properties
// that are requried to create a new Contributor
interface ContributorAttrs {
  name: string;
  lastname: string;
  phone: string;
  amount: number;
  installments: number;
  campaign: string;
  date: Date
}

// An interface that describes the properties
// that a Contributor Model has
interface ContributorModel extends mongoose.Model<ContributorDoc>, PaginateModel<ContributorDoc> {
  build(attrs: ContributorAttrs): ContributorDoc;
}

// An interface that describes the properties
// that a Contributor Document has
export interface ContributorDoc extends mongoose.Document {
  name: string;
  lastname: string;
  phone: string;
  amount: number;
  installments: number;
  campaign: string;
  date: Date
}

const ContributorSchema = new mongoose.Schema<ContributorDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    installments: {
      type: Number,
      required: true,
    },
    campaign: {
      type: String,
      required: true  
    },
    date: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ContributorSchema.plugin(mongoosePaginate);

ContributorSchema.statics.build = (attrs: ContributorAttrs) => {
  return new Contributor(attrs);
};

const Contributor = mongoose.model<ContributorDoc, ContributorModel>("Contributor", ContributorSchema);

export { Contributor };
