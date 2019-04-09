/* @flow */

import React from "react";
import { t } from "ttag";

import Form from "metabase/containers/Form";
import ModalContent from "metabase/components/ModalContent";

import entityType from "./EntityType";

@entityType()
export default class EntityForm extends React.Component {
  render() {
    const {
      entityDef,
      entityObject,
      update,
      create,
      onClose,
      onSaved,
      modal,
      title,
      ...props
    } = this.props;
    const form = (
      <Form
        {...props}
        form={entityDef.form}
        initialValues={entityObject}
        onSubmit={object =>
          object.id != null ? update(object) : create(object)
        }
        onSubmitSuccess={action => onSaved && onSaved(action.payload.object)}
      />
    );
    if (modal) {
      return (
        <ModalContent
          title={
            title ||
            (entityObject && entityObject.id != null
              ? entityDef.objectSelectors.getName(entityObject)
              : t`New ${entityDef.displayNameOne}`)
          }
          onClose={onClose}
        >
          {form}
        </ModalContent>
      );
    } else {
      return form;
    }
  }
}
