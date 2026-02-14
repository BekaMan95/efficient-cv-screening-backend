import mongoose, { Document, Number, Schema } from 'mongoose';

export interface IApplication extends Document {
    job_id: string;
    cv_url: string;
    score: Number;
    location: string;
    languages: string[];
    skill: string[];
    year_of_experience: number;
    education_level: string;
    createdAt: Date;
    updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>({
  job_id: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  cv_url: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
  },
  location: {
    type: String,
    trim: true,
  },
  languages: {
    type: [String],
  },
  skill: {
    type: [String],
    required: [true, 'skill required'],
  },
  year_of_experience: {
    type: Number,
  },
  education_level: {
    type: String,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete (ret as Record<string, unknown>).__v;
      return ret;
    }
  }
});

applicationSchema.index({ score: 'text', job_id: 'text' });
applicationSchema.index({ createdAt: -1 });

export default mongoose.model<IApplication>('Application', applicationSchema);
