import { Schema, Document, ObjectId } from 'mongoose'

export const CustomerModelName = 'Customer'

export const CustomerSchema = new Schema({
  object: {
    type: String,
  },
  id: {
    type: String,
  },
  dateCreated: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  phone: {
    type: String,
  },
  mobilePhone: {
    type: String,
  },
  address: {
    type: String,
  },
  addressNumber: {
    type: String,
    required: true,
  },
  complement: {
    type: String,
  },
  province: {
    type: String,
  },
  postalCode: {
    type: String,
    required: true,
  },
  cpfCnpj: {
    type: String,
    unique: true,
    required: true,
  },
  personType: {
    type: String,
  },
  deleted: {
    type: Boolean,
  },
  additionalEmails: {
    type: String,
  },
  externalReference: {
    type: String,
  },
  notificationDisabled: {
    type: Boolean,
  },
  observations: {
    type: String,
  },
  municipalInscription: {
    type: String,
  },
  stateInscription: {
    type: String,
  },
  canDelete: {
    type: Boolean,
  },
  cannotBeDeletedReason: {
    type: String,
  },
  canEdit: {
    type: Boolean,
  },
  cannotEditReason: {
    type: String,
  },
  foreignCustomer: {
    type: Boolean,
  },
  city: {
    type: Number,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
})

export interface ICustomer extends Document {
  _id: ObjectId
  object: string
  id: string
  dateCreated: string
  name: string
  email: string
  company: string
  phone: string
  mobilePhone: string
  address: string
  addressNumber: string
  complement: string
  province: string
  postalCode: string
  cpfCnpj: string
  personType: string
  deleted: boolean
  additionalEmails: string
  externalReference: string
  notificationDisabled: boolean
  observations: string
  municipalInscription: string
  stateInscription: string
  canDelete: boolean
  cannotBeDeletedReason: string
  canEdit: boolean
  cannotEditReason: string
  foreignCustomer: boolean
  city: number
  state: string
  country: string
}
