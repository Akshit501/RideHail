/* eslint-disable @typescript-eslint/no-explicit-any */
// // src/redux/features/rider/riderApi.ts
// import { baseApi } from "@/redux/baseApi";
// import type { IRide } from "@/types/ride.interface";

// export const riderApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({

//     // ✅ Request a ride
//     requestRide: builder.mutation<IRide, { pickupLocation: string; dropoffLocation: string }>({
//       query: (data) => ({
//         url: "/ride/request",
//         method: "POST",
//         data,
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       invalidatesTags: ["Ride"],
//     }),

//     // ✅ Get my rides
//     getMyRides: builder.query<IRide[], void>({
//       query: () => ({
//         url: "/ride/my-rides",
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide[] }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Get single ride details
//     getSingleRide: builder.query<IRide, string>({
//       query: (id) => ({
//         url: `/ride/${id}`,
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Cancel a ride
//     cancelRide: builder.mutation<IRide, string>({
//       query: (id) => ({
//         url: `/ride/cancel/${id}`,
//         method: "PATCH",
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       invalidatesTags: ["Ride"],
//     }),
//   }),
// });

// export const {
//   useRequestRideMutation,
//   useGetMyRidesQuery,
//   useGetSingleRideQuery,
//   useCancelRideMutation,
// } = riderApi;


// src/redux/features/rider/riderApi.ts
import { baseApi } from "@/redux/baseApi";
import type { IRide } from "@/types/ride.interface";

const DEMO_RIDES_KEY = "demo_rides";

const canUseStorage = () => typeof window !== "undefined";

const getDemoRides = (): IRide[] => {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(DEMO_RIDES_KEY);
    return raw ? (JSON.parse(raw) as IRide[]) : [];
  } catch {
    return [];
  }
};

const saveDemoRides = (rides: IRide[]) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(DEMO_RIDES_KEY, JSON.stringify(rides));
};

const createDemoRide = (payload: {
  pickupLocation: string;
  dropoffLocation: string;
  fare: number;
}): IRide => {
  const now = new Date().toISOString();
  return {
    _id: `demo-${Date.now()}`,
    rider: { _id: "demo-rider", name: "Demo Rider" },
    pickupLocation: payload.pickupLocation,
    dropoffLocation: payload.dropoffLocation,
    status: "pending",
    fare: payload.fare,
    requestedAt: now,
    createdAt: now,
  };
};

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Request a ride
    requestRide: builder.mutation<
      IRide,
      { pickupLocation: string; dropoffLocation: string; fare: number }
    >({
      async queryFn(data, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: "/ride/request",
          method: "POST",
          data,
        });

        if (!("error" in result)) {
          const payload = result.data as { data?: IRide } | IRide;
          return {
            data: (payload as { data?: IRide }).data ?? (payload as IRide),
          };
        }

        const demoRide = createDemoRide(data);
        saveDemoRides([demoRide, ...getDemoRides()]);
        return { data: demoRide };
      },
      invalidatesTags: ["Ride"],
    }),

    // ✅ Get my rides
    getMyRides: builder.query<IRide[], void>({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: "/ride/my-rides",
          method: "GET",
        });

        if (!("error" in result)) {
          const payload = result.data as { data?: IRide[] } | IRide[];
          return {
            data: (payload as { data?: IRide[] }).data ?? (payload as IRide[]),
          };
        }

        return { data: getDemoRides() };
      },
      providesTags: ["Ride"],
    }),

    // ✅ Get single ride details
    getSingleRide: builder.query<IRide, string>({
      async queryFn(id, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `/ride/${id}`,
          method: "GET",
        });

        if (!("error" in result)) {
          const payload = result.data as { data?: IRide } | IRide;
          return {
            data: (payload as { data?: IRide }).data ?? (payload as IRide),
          };
        }

        const ride = getDemoRides().find((item) => item._id === id);
        if (!ride) {
          return {
            error: {
              status: 404,
              data: { message: "Ride not found" },
            },
          };
        }

        return { data: ride };
      },
      providesTags: ["Ride"],
    }),

    // ✅ Cancel a ride
    cancelRide: builder.mutation<IRide, string>({
      async queryFn(id, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `/ride/cancel/${id}`,
          method: "PATCH",
        });

        if (!("error" in result)) {
          const payload = result.data as { data?: IRide } | IRide;
          return {
            data: (payload as { data?: IRide }).data ?? (payload as IRide),
          };
        }

        const rides = getDemoRides();
        const idx = rides.findIndex((item) => item._id === id);
        if (idx === -1) {
          return {
            error: {
              status: 404,
              data: { message: "Ride not found" },
            },
          };
        }

        const updatedRide = { ...rides[idx], status: "cancelled" as const };
        rides[idx] = updatedRide;
        saveDemoRides(rides);
        return { data: updatedRide };
      },
      invalidatesTags: ["Ride"],
    }),

    // ✅ Get rider profile
    getRiderProfile: builder.query<any, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["User"],
    }),

    // ✅ Update rider profile
    updateRiderProfile: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: `/users/${data._id}`,
        method: "PUT",
        data,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRequestRideMutation,
  useGetMyRidesQuery,
  useGetSingleRideQuery,
  useCancelRideMutation,
  useGetRiderProfileQuery,
  useUpdateRiderProfileMutation,
} = riderApi;