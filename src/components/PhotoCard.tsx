// ./src/components/PhotoCard.tsx

import { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonIcon,
  IonRow,
  useIonToast,
} from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";

import { store } from "../modules/Store";

import { Photo } from "../types/Photo";

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const { id, urls, description, user, likes } = photo;
  const [isFavorite, setIsFavorite] = useState(false);

  const [present] = useIonToast();

  /**
   * function to present a toast message
   * @param message the message to display
   */
  const presentToast = (message: string) => {
    present({
      message,
      duration: 2000,
      animated: true,
      position: "bottom",
    });
  };

  /**
   * function to get the favorites from the store
   * @returns {Promise<Photo[]>} the favorites
   */
  const getFavorites = async (): Promise<Photo[]> => {
    const favorites = await store.get("favorites");
    console.log({ favorites });
    return favorites || [];
  };

  /**
   * function to check if a photo is already in favorites
   */
  const checkIsFavorite = async () => {
    const favorites = await getFavorites();
    const isFavorite = favorites.some((favorite: any) => favorite.id === id);
    console.log({ isFavorite });
    setIsFavorite(isFavorite);
  };

  /**
   * function to add a photo to favorites
   * @param photo
   */
  const addToFavorites = async (photo: Photo) => {
    let favorites = await getFavorites();
    store.set("favorites", [...favorites, photo]);
    console.log({ favorites });
    setIsFavorite(true);
  };

  /**
   * function to remove a photo from favorites
   */
  const removeFromFavorites = async () => {
    let favorites = await getFavorites();
    store.set(
      "favorites",
      favorites.filter((favorite: { id: string }) => favorite.id !== id)
    );
    setIsFavorite(false);
  };

  /**
   * function to add or remove a photo from favorites depending on the current `isFavorite` state
   */
  const toggleFavorite = async () => {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites(photo);
    }
    presentToast(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  useEffect(() => {
    checkIsFavorite();
  }, []);

  return (
    <IonCard>
      <img
        src={urls.regular}
        alt={description}
        style={{
          height: "24rem",
          width: "100%",
          objectFit: "cover",
        }}
      />
      <IonCardContent>
        <IonRow>
          <IonCol style={{ display: "flex", flexDirection: "column" }}>
            <IonCardSubtitle>@{user.username}</IonCardSubtitle>
            <IonCardSubtitle>
              {likes} like{likes > 1 && "s"}
            </IonCardSubtitle>
          </IonCol>
          <IonCol className="ion-text-right">
            <IonButton
              onClick={() => {
                toggleFavorite();
              }}
            >
              <IonIcon icon={isFavorite ? heart : heartOutline} />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default PhotoCard;


// ./src/components/PhotoCard.tsx

// import {
//   IonButton,
//   IonCard,
//   IonCardContent,
//   IonCardSubtitle,
//   IonCol,
//   IonIcon,
//   IonRow,
//   useIonToast,
// } from "@ionic/react";
// import {  heartOutline } from "ionicons/icons";

// import { Photo } from "../types/Photo";
// const PhotoCard = ({ photo }: { photo: Photo }) => {
//   const { id, urls, description, user, likes } = photo;

//   return (
//     <IonCard>
//       <img
//         src={urls.regular}
//         alt={description}
//         style={{
//           height: "24rem",
//           width: "100%",
//           objectFit: "cover",
//         }}
//       />
//       <IonCardContent>
//         <IonRow>
//           <IonCol style={{ display: "flex", flexDirection: "column" }}>
//             <IonCardSubtitle>@{user.username}</IonCardSubtitle>
//             <IonCardSubtitle>
//               {likes} like{likes > 1 && "s"}
//             </IonCardSubtitle>
//           </IonCol>
//           <IonCol className="ion-text-right">
//             <IonButton>
//               <IonIcon icon={heartOutline} />
//             </IonButton>
//           </IonCol>
//         </IonRow>
//       </IonCardContent>
//     </IonCard>
//   );
// };
// export default PhotoCard;