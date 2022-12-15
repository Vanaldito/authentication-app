import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader, Modal, Navbar } from "../../components";
import { useFetchAndLoad, useUserInfo } from "../../hooks";
import { updateUserInfo } from "../../services";

import "./EditInfoPage.css";

export default function EditInfoPage() {
  const { userInfo, reloadUserInfo } = useUserInfo();

  const [name, setName] = useState(userInfo?.name ?? "");
  const [bio, setBio] = useState(userInfo?.bio ?? "");
  const [phone, setPhone] = useState(userInfo?.phone ?? "");

  const [error, setError] = useState("");

  const { loading: savingInfo, callEndpoint: callUpdateInfoEndpoint } =
    useFetchAndLoad();

  const navigate = useNavigate();

  function changeHandler(setValue: (value: string) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (savingInfo) return;

    callUpdateInfoEndpoint(updateUserInfo({ name, bio, phone })).then(res => {
      if (res.error) return setError(res.error);
      else {
        reloadUserInfo();
        navigate("/");
      }
    });
  }

  return !userInfo ? (
    <Loader />
  ) : (
    <div className="edit-info-page">
      <Navbar />
      <div className="edit-user-info">
        <header className="edit-user-info__header">
          <div>
            <h2 className="edit-user-info__title">Change Info</h2>
            <p className="edit-user-info__warning">
              Changes will be reflected to every services
            </p>
          </div>
        </header>
        <form className="edit-user-info__table" onSubmit={submitHandler}>
          <div className="edit-user-info__row">
            <img
              className="edit-user-info__profile-image"
              src={userInfo.photourl}
              alt="Profile Image"
            />
          </div>
          <div className="edit-user-info__row">
            <FormField
              value={name}
              onChange={changeHandler(setName)}
              placeholder="Enter your name..."
              label="Name"
            />
          </div>
          <div className="edit-user-info__row">
            <FormField
              value={bio}
              onChange={changeHandler(setBio)}
              placeholder="Enter your bio..."
              label="Bio"
            />
          </div>
          <div className="edit-user-info__row">
            <FormField
              value={phone}
              onChange={changeHandler(setPhone)}
              placeholder="Enter your phone..."
              label="Phone"
            />
          </div>
          <div className="edit-user-info__row">
            <FormField value={userInfo.email} readOnly={true} label="Email" />
          </div>
          <div className="edit-user-info__row">
            <button type="submit" className="edit-user-info__submit-button">
              {savingInfo ? <Loader /> : "Save"}
            </button>
          </div>
        </form>
      </div>
      {error && <Modal closeModal={() => setError("")}>{error}</Modal>}
    </div>
  );
}
