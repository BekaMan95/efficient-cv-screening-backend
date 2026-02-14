import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  role: string;
  skill: string;
  min_year_experience: number;
  min_education_level: string;
  max_applicants: number;
  remaining_space: number;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
  },
  skill: {
    type: String,
    required: [true, 'skill required'],
  },
  min_year_experience: {
    type: Number,
    required: [true, 'Minimum years of experience is required'],
  },
  min_education_level: {
    type: String,
    required: [true, 'Minimum education level is required'],
  },
  max_applicants: {
    type: Number,
    required: [true, 'Maximum applicants is required'],
  },
  remaining_space: {
    type: Number,
    default: 0,
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

jobSchema.index({ title: 'text', role: 'text' });
jobSchema.index({ createdAt: -1 });

export default mongoose.model<IJob>('Job', jobSchema);
