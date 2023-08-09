import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectValueState,
  mostrarModal,
} from "../../redux/features/valueSlice";
import { store } from "../../redux/store";

export default function ModalError({ message }) {
  const exact = store.getState().valueState;
  const variant = useSelector(selectValueState);
  const dispatch = useDispatch();
  console.table(variant.active);
  return (
    // <CModal visible={visible} onClose={() => setVisible(false)}>
    <CModal
      visible={variant.active}
      onClose={() => dispatch(mostrarModal(false))}
    >
      <CModalHeader>Campos faltantes</CModalHeader>
      <CModalBody>{message}</CModalBody>
    </CModal>
  );
}
