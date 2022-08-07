import {
  AbandonedCheckoutDocument,
  AbandonedCheckoutModel,
} from "./checkout.model";
import {
  AbandonedCheckoutRequest,
  IAbandonedCheckoutModel,
} from "./checkout.type";

const documentToObject = (
  doc: AbandonedCheckoutDocument
): IAbandonedCheckoutModel => {
  return doc.toObject({ getters: true }) as IAbandonedCheckoutModel;
};

const create = async (input: AbandonedCheckoutRequest) => {
  try {
    const document = await AbandonedCheckoutModel.create(input);
    return document && documentToObject(document);
  } catch (error) {
    throw error;
  }
};

const get = async (id: string) => {
  try {
    const document = await AbandonedCheckoutModel.findOne({ _id: id });
    return document && documentToObject(document);
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id: string) => {
  try {
    const document = await AbandonedCheckoutModel.deleteOne({ _id: id });
    return;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  get,
  deleteById,
};
