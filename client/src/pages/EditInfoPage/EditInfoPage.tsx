import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormField,
  Loader,
  Modal,
  Navbar,
  ProtectedRoute,
} from "../../components";
import { useFetchAndLoad, useUserInfo } from "../../hooks";
import { updateUserInfo } from "../../services";

import "./EditInfoPage.css";

export default function EditInfoPage() {
  const {
    userInfo,
    reloadUserInfo,
    loading: loadingUserInfo,
    error: userInfoError,
    clearError: clearUserInfoError,
  } = useUserInfo();

  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [editingPhotoUrl, setEditingPhotoUrl] = useState(false);
  const [photoUrlInputValue, setPhotoUrlInputValue] = useState<
    string | undefined
  >(undefined);

  const [name, setName] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState<string | undefined>(undefined);

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

    callUpdateInfoEndpoint(updateUserInfo({ name, bio, phone, photoUrl })).then(
      res => {
        if (res.error) return setError(res.error);
        else {
          reloadUserInfo();
          navigate("/");
        }
      }
    );
  }

  function updatePhotoUrl(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPhotoUrl(photoUrlInputValue);
    setEditingPhotoUrl(false);
  }

  return (
    <ProtectedRoute>
      {loadingUserInfo ? (
        <Loader />
      ) : (
        <div className="edit-info-page">
          <Navbar displayUserInfo={true} />
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
                <figure
                  className="edit-user-info__profile-figure"
                  onClick={() => setEditingPhotoUrl(true)}
                >
                  <img
                    className="edit-user-info__profile-image"
                    src={photoUrl ?? userInfo?.photourl}
                    referrerPolicy="no-referrer"
                    alt="Profile Image"
                  />
                </figure>
              </div>
              <div className="edit-user-info__row">
                <FormField
                  value={name ?? userInfo?.name}
                  onChange={changeHandler(setName)}
                  placeholder="Enter your name..."
                  label="Name"
                />
              </div>
              <div className="edit-user-info__row">
                <FormField
                  value={bio ?? userInfo?.bio}
                  onChange={changeHandler(setBio)}
                  placeholder="Enter your bio..."
                  label="Bio"
                />
              </div>
              <div className="edit-user-info__row">
                <FormField
                  value={phone ?? userInfo?.phone}
                  onChange={changeHandler(setPhone)}
                  placeholder="Enter your phone..."
                  label="Phone"
                />
              </div>
              <div className="edit-user-info__row">
                <FormField
                  value={userInfo?.email ?? ""}
                  readOnly={true}
                  label="Email"
                />
              </div>
              <div className="edit-user-info__row">
                <button type="submit" className="edit-user-info__submit-button">
                  {savingInfo ? <Loader /> : "Save"}
                </button>
              </div>
            </form>
          </div>
          {editingPhotoUrl && (
            <Modal closeModal={() => setEditingPhotoUrl(false)}>
              <form onSubmit={updatePhotoUrl}>
                <FormField
                  value={photoUrlInputValue}
                  onChange={changeHandler(setPhotoUrlInputValue)}
                  placeholder="Enter the photo url..."
                />
                <button className="edit-user-info__update-photo-button">
                  OK
                </button>
              </form>
            </Modal>
          )}
          {userInfoError && (
            <Modal closeModal={clearUserInfoError}>{userInfoError}</Modal>
          )}
          {error && <Modal closeModal={() => setError("")}>{error}</Modal>}
        </div>
      )}
    </ProtectedRoute>
  );
}
