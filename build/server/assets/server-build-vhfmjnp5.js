import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, useLoaderData, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLoaderData as useLoaderData$1, useLocation as useLocation$1, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import slugify from "slugify";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region src/components/Navbar.jsx
function Navbar({ setResponsiveToggle }) {
	const [navbarTitle, setNavbarTitle] = useState("Dashboard");
	const [isMobileResponsive, setIsMobileResponsive] = useState(false);
	const pathName = useLocation$1().pathname;
	useEffect(() => {
		if (pathName === "/") setNavbarTitle("Home");
		else if (pathName === "/about-us") setNavbarTitle("About Us");
		else if (pathName === "/blogs") setNavbarTitle("Blogs");
		else if (pathName === "/blogs/:id") setNavbarTitle("Edit Blog");
		else if (pathName === "/blog-categories") setNavbarTitle("Blog Categories");
	}, [pathName]);
	useEffect(() => {
		window.innerWidth < 992 && setIsMobileResponsive(true);
	}, []);
	return /* @__PURE__ */ jsx("header", {
		className: "navbar px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container",
			children: [/* @__PURE__ */ jsxs("h2", { children: [
				isMobileResponsive && /* @__PURE__ */ jsx("i", {
					onClick: () => setResponsiveToggle((prev) => !prev),
					className: "fa-solid fa-bars"
				}),
				" ",
				navbarTitle
			] }), /* @__PURE__ */ jsx("button", { children: "Logout" })]
		})
	});
}
//#endregion
//#region src/components/Sidebar.jsx
function Sidebar({ responsiveToggle, setResponsiveToggle }) {
	const [isMobileResponsive, setIsMobileResponsive] = useState(false);
	useEffect(() => {
		window.innerWidth < 992 && setIsMobileResponsive(true);
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [isMobileResponsive && /* @__PURE__ */ jsx("div", {
		onClick: () => setResponsiveToggle(false),
		className: `sidebar-backdrop ${responsiveToggle ? "sidebar-backdrop-show sidebar-backdrop-hide" : "sidebar-backdrop-hide"}`
	}), /* @__PURE__ */ jsxs("aside", {
		className: `sidebar ${responsiveToggle ? "sidebar-show sidebar-hide" : "sidebar-hide"}`,
		children: [/* @__PURE__ */ jsxs("h2", {
			className: "d-flex align-items-center justify-content-between",
			children: ["AI Admin ", /* @__PURE__ */ jsx("i", {
				onClick: () => setResponsiveToggle(false),
				className: "fa-solid d-lg-none fa-xmark"
			})]
		}), /* @__PURE__ */ jsxs("nav", { children: [
			/* @__PURE__ */ jsx(Link, {
				to: "/",
				children: "Homepage"
			}),
			/* @__PURE__ */ jsx(Link, {
				to: "/about-us",
				children: "About Us"
			}),
			/* @__PURE__ */ jsx(Link, {
				to: "/blogs",
				children: "Blogs"
			}),
			/* @__PURE__ */ jsx(Link, {
				to: "/blog-categories",
				children: "Blog Categories"
			})
		] })]
	})] });
}
//#endregion
//#region src/root.jsx
var root_exports = /* @__PURE__ */ __exportAll({ default: () => root_default });
var Root = () => {
	const [responsiveToggle, setResponsiveToggle] = useState(false);
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap.js");
	}, []);
	const pathName = useLocation().pathname;
	const navNotIncluded = pathName.includes("/login");
	useEffect(() => {
		setResponsiveToggle(false);
	}, [pathName]);
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1.0"
			}),
			/* @__PURE__ */ jsx("title", { children: "Document" }),
			/* @__PURE__ */ jsx("link", {
				rel: "stylesheet",
				href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css",
				integrity: "sha512-QeR2VH+lsBE5LSAe1Q5EnTBbe7XTBubt8dG93Y7gidSgdMCr8nVqKcfKAMyN96SV8KDbZVTDXChatu5G2KQGzg==",
				crossorigin: "anonymous",
				referrerpolicy: "no-referrer"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", {
			suppressHydrationWarning: true,
			children: [
				/* @__PURE__ */ jsx(ToastContainer, {
					position: "top-right",
					autoClose: 3e3
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "app",
					children: [!navNotIncluded && /* @__PURE__ */ jsx(Sidebar, {
						responsiveToggle,
						setResponsiveToggle
					}), /* @__PURE__ */ jsxs("div", {
						className: "main",
						children: [!navNotIncluded && /* @__PURE__ */ jsx(Navbar, { setResponsiveToggle }), /* @__PURE__ */ jsx("div", {
							className: `content ${navNotIncluded ? "p-0" : ""}`,
							children: /* @__PURE__ */ jsx(Outlet, {})
						})]
					})]
				}),
				/* @__PURE__ */ jsx(ScrollRestoration, {}),
				/* @__PURE__ */ jsx(Scripts, {})
			]
		})]
	});
};
var root_default = UNSAFE_withComponentProps(Root);
//#endregion
//#region src/api/axios.jsx
var api = axios.create({ baseURL: "https://ai-node-backend-kgpo.onrender.com/api/v1" });
//#endregion
//#region src/components/DashboardCard.jsx
function DashboardCard({ title, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "dashboard-card",
		children: [/* @__PURE__ */ jsx("h3", { children: value }), /* @__PURE__ */ jsx("p", { children: title })]
	});
}
//#endregion
//#region src/components/PageLoader.jsx
var PageLoader = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "rfc-wrapper",
		children: /* @__PURE__ */ jsxs("div", {
			className: "diafmsdf",
			children: [/* @__PURE__ */ jsx("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				style: { display: "none" },
				children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", {
					id: "rfc-goo-blur",
					children: [/* @__PURE__ */ jsx("feGaussianBlur", {
						in: "SourceGraphic",
						stdDeviation: 10,
						result: "blur"
					}), /* @__PURE__ */ jsx("feColorMatrix", {
						in: "blur",
						mode: "matrix",
						values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10",
						result: "goo"
					})]
				}) })
			}), /* @__PURE__ */ jsxs("div", {
				className: "rfc-goo-container",
				children: [
					/* @__PURE__ */ jsx("div", { className: "rfc-goo-blob" }),
					/* @__PURE__ */ jsx("div", { className: "rfc-goo-blob" }),
					/* @__PURE__ */ jsx("div", { className: "rfc-goo-blob" }),
					/* @__PURE__ */ jsx("div", { className: "rfc-goo-blob" })
				]
			})]
		})
	});
};
//#endregion
//#region src/pages/Homepage.jsx
var Homepage_exports = /* @__PURE__ */ __exportAll({
	default: () => Homepage_default,
	loader: () => loader$3
});
async function loader$3() {
	try {
		const homePage = (await api.get("/homepage")).data.data.homePage;
		if (!homePage?.pricingPlans?.length) homePage.pricingPlans = [{
			planName: "",
			planPurpose: "",
			price: "",
			duration: "",
			planDetails: [""],
			ctaButton: ""
		}];
		return { homePageData: homePage };
	} catch (err) {
		console.log(err);
		throw new Response("Failed to load homepage", { status: 500 });
	}
}
var Homepage_default = UNSAFE_withComponentProps(function Homepage() {
	const { homePageData } = useLoaderData();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		heroSubHeading: "",
		heroHeading: "",
		heroDescription: "",
		heroRatingLeft: "",
		heroRatingRight: "",
		coreSubHeading: "",
		coreHeading: "",
		coreCapabilities: [
			{
				icon: "",
				title: "",
				description: ""
			},
			{
				icon: "",
				title: "",
				description: ""
			},
			{
				icon: "",
				title: "",
				description: ""
			}
		],
		codeIntegrationSubHeading: "",
		codeIntegrationHeading: "",
		codeIntegrationDescription: "",
		codeIntegrationSteps: [
			{
				stepCount: "",
				title: "",
				description: ""
			},
			{
				stepCount: "",
				title: "",
				description: ""
			},
			{
				stepCount: "",
				title: "",
				description: ""
			}
		],
		codeIntegrationSample: "",
		stats: [
			{
				value: "",
				unit: "",
				label: ""
			},
			{
				value: "",
				unit: "",
				label: ""
			},
			{
				value: "",
				unit: "",
				label: ""
			}
		],
		pricingSubHeading: "",
		pricingHeading: "",
		pricingPlans: [{
			planName: "",
			planPurpose: "",
			price: "",
			duration: "",
			planDetails: [""],
			ctaButton: ""
		}],
		...homePageData
	});
	const handleChange = (e, arrayName = null, index = null, nestedArray = null, nestedIndex = null) => {
		const { name, value } = e.target;
		if (nestedArray !== null) setFormData((prev) => ({
			...prev,
			[arrayName]: prev[arrayName].map((item, i) => i === index ? {
				...item,
				[nestedArray]: item[nestedArray].map((nestedItem, j) => j === nestedIndex ? value : nestedItem)
			} : item)
		}));
		else if (index !== null) setFormData((prev) => ({
			...prev,
			[arrayName]: prev[arrayName].map((item, i) => i === index ? {
				...item,
				[name]: value
			} : item)
		}));
		else setFormData({
			...formData,
			[name]: value
		});
	};
	const handleAddPlan = () => {
		setFormData((prev) => ({
			...prev,
			pricingPlans: [...prev.pricingPlans, {
				planName: "",
				planPurpose: "",
				price: "",
				duration: "",
				planDetails: [""],
				ctaButton: ""
			}]
		}));
	};
	const handleRemovePlan = (id) => {
		setFormData((prev) => ({
			...prev,
			pricingPlans: prev.pricingPlans.filter((plan) => plan._id !== id)
		}));
	};
	const handleAddFeature = (planId) => {
		setFormData((prev) => ({
			...prev,
			pricingPlans: prev.pricingPlans.map((plan) => plan._id === planId ? {
				...plan,
				planDetails: [...plan.planDetails, ""]
			} : plan)
		}));
	};
	const handleRemovePlanDetail = (planId, detailIndex) => {
		setFormData((prev) => ({
			...prev,
			pricingPlans: prev.pricingPlans.map((pricingPlan) => pricingPlan._id === planId ? {
				...pricingPlan,
				planDetails: pricingPlan.planDetails.filter((_, index) => index !== detailIndex)
			} : pricingPlan)
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await api.patch("/homepage", formData);
			toast.success("Homepage successfully updated");
		} catch (err) {
			console.log(err);
			toast.error(err?.message || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [isLoading && /* @__PURE__ */ jsx(PageLoader, {}), /* @__PURE__ */ jsxs("div", {
		className: "page",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "cards",
				children: [
					/* @__PURE__ */ jsx(DashboardCard, {
						title: "About Us",
						value: "12"
					}),
					/* @__PURE__ */ jsx(DashboardCard, {
						title: "Pricing Plans",
						value: "3"
					}),
					/* @__PURE__ */ jsx(DashboardCard, {
						title: "Blogs",
						value: "10"
					}),
					/* @__PURE__ */ jsx(DashboardCard, {
						title: "Blog Categories",
						value: "3"
					})
				]
			}),
			/* @__PURE__ */ jsx("h2", {
				style: { marginTop: 40 },
				children: "Homepage Sections"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "sdgdhgsfdf",
				children: /* @__PURE__ */ jsxs("form", {
					className: "row",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "col-lg-12 mb-3",
							children: /* @__PURE__ */ jsxs("div", {
								className: "row",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "col-md-6 mb-3",
										children: /* @__PURE__ */ jsx("input", {
											type: "text",
											name: "heroSubHeading",
											value: formData.heroSubHeading,
											className: "form-control",
											placeholder: "Hero Sub Heading",
											onChange: handleChange
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-md-6 mb-3",
										children: /* @__PURE__ */ jsx("input", {
											type: "text",
											name: "heroHeading",
											value: formData.heroHeading,
											className: "form-control",
											placeholder: "Hero Heading",
											onChange: handleChange
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-12 mb-3",
										children: /* @__PURE__ */ jsx("textarea", {
											name: "heroDescription",
											value: formData.heroDescription,
											className: "form-control",
											rows: "3",
											onChange: handleChange,
											placeholder: "Hero Description"
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-md-6 mb-3",
										children: /* @__PURE__ */ jsx("input", {
											type: "text",
											name: "heroRatingLeft",
											value: formData.heroRatingLeft,
											className: "form-control",
											placeholder: "Hero Rating Left",
											onChange: handleChange
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-md-6 mb-3",
										children: /* @__PURE__ */ jsx("input", {
											type: "text",
											name: "heroRatingRight",
											value: formData.heroRatingRight,
											className: "form-control",
											placeholder: "Hero Rating Right",
											onChange: handleChange
										})
									})
								]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-lg-12 mb-3",
							children: /* @__PURE__ */ jsxs("div", {
								className: "row",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "col-12 mb-3",
										children: /* @__PURE__ */ jsx("h4", { children: "Core Section" })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-md-6 mb-3",
										children: /* @__PURE__ */ jsx("input", {
											value: formData.coreSubHeading,
											onChange: handleChange,
											name: "coreSubHeading",
											type: "text",
											className: "form-control",
											placeholder: "Core Sub Heading"
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-md-6 mb-3",
										children: /* @__PURE__ */ jsx("input", {
											value: formData.coreHeading,
											onChange: handleChange,
											name: "coreHeading",
											type: "text",
											className: "form-control",
											placeholder: "Core Heading"
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-lg-12 mb-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "row",
											children: [
												/* @__PURE__ */ jsx("div", {
													className: "col-md-4 mb-3",
													children: /* @__PURE__ */ jsx("input", {
														value: formData.coreCapabilities[0].icon,
														onChange: (e) => handleChange(e, "coreCapabilities", 0),
														name: "icon",
														type: "text",
														className: "form-control",
														placeholder: "Icon 1"
													})
												}),
												/* @__PURE__ */ jsx("div", {
													className: "col-md-4 mb-3",
													children: /* @__PURE__ */ jsx("input", {
														value: formData.coreCapabilities[0].title,
														onChange: (e) => handleChange(e, "coreCapabilities", 0),
														name: "title",
														type: "text",
														className: "form-control",
														placeholder: "Title 1"
													})
												}),
												/* @__PURE__ */ jsx("div", {
													className: "col-md-4 mb-3",
													children: /* @__PURE__ */ jsx("textarea", {
														value: formData.coreCapabilities[0].description,
														onChange: (e) => handleChange(e, "coreCapabilities", 0),
														name: "description",
														className: "form-control",
														rows: "1",
														placeholder: "Description 1"
													})
												})
											]
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-lg-12 mb-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "row",
											children: [
												/* @__PURE__ */ jsx("div", {
													className: "col-md-4 mb-3",
													children: /* @__PURE__ */ jsx("input", {
														value: formData.coreCapabilities[1].icon,
														onChange: (e) => handleChange(e, "coreCapabilities", 1),
														name: "icon",
														type: "text",
														className: "form-control",
														placeholder: "Icon 2"
													})
												}),
												/* @__PURE__ */ jsx("div", {
													className: "col-md-4 mb-3",
													children: /* @__PURE__ */ jsx("input", {
														value: formData.coreCapabilities[1].title,
														onChange: (e) => handleChange(e, "coreCapabilities", 1),
														name: "title",
														type: "text",
														className: "form-control",
														placeholder: "Title 2"
													})
												}),
												/* @__PURE__ */ jsx("div", {
													className: "col-md-4 mb-3",
													children: /* @__PURE__ */ jsx("textarea", {
														value: formData.coreCapabilities[1].description,
														onChange: (e) => handleChange(e, "coreCapabilities", 1),
														name: "description",
														className: "form-control",
														rows: "1",
														placeholder: "Description 2"
													})
												})
											]
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-lg-12 mb-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "row",
											children: [
												/* @__PURE__ */ jsx("div", {
													className: "col-md-4 mb-3",
													children: /* @__PURE__ */ jsx("input", {
														value: formData.coreCapabilities[2].icon,
														onChange: (e) => handleChange(e, "coreCapabilities", 2),
														name: "icon",
														type: "text",
														className: "form-control",
														placeholder: "Icon 3"
													})
												}),
												/* @__PURE__ */ jsx("div", {
													className: "col-md-4 mb-3",
													children: /* @__PURE__ */ jsx("input", {
														value: formData.coreCapabilities[2].title,
														onChange: (e) => handleChange(e, "coreCapabilities", 2),
														name: "title",
														type: "text",
														className: "form-control",
														placeholder: "Title 3"
													})
												}),
												/* @__PURE__ */ jsx("div", {
													className: "col-md-4 mb-3",
													children: /* @__PURE__ */ jsx("textarea", {
														value: formData.coreCapabilities[2].description,
														onChange: (e) => handleChange(e, "coreCapabilities", 2),
														name: "description",
														className: "form-control",
														rows: "1",
														placeholder: "Description 3"
													})
												})
											]
										})
									})
								]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-12 mt-4 mb-3",
							children: /* @__PURE__ */ jsx("h4", { children: "Code Integration" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-6 mb-3",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.codeIntegrationSubHeading,
								onChange: handleChange,
								name: "codeIntegrationSubHeading",
								type: "text",
								className: "form-control",
								placeholder: "Code Integration Sub Heading"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-6 mb-3",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.codeIntegrationHeading,
								onChange: handleChange,
								name: "codeIntegrationHeading",
								type: "text",
								className: "form-control",
								placeholder: "Code Integration Heading"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-12 mb-3",
							children: /* @__PURE__ */ jsx("textarea", {
								value: formData.codeIntegrationDescription,
								onChange: handleChange,
								name: "codeIntegrationDescription",
								className: "form-control",
								rows: "3",
								placeholder: "Code Integration Description"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-2 mb-3",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.codeIntegrationSteps[0].stepCount,
								onChange: (e) => handleChange(e, "codeIntegrationSteps", 0),
								name: "stepCount",
								type: "number",
								className: "form-control",
								placeholder: "Step Count"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-5 mb-3",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.codeIntegrationSteps[0].title,
								onChange: (e) => handleChange(e, "codeIntegrationSteps", 0),
								name: "title",
								type: "text",
								className: "form-control",
								placeholder: "Step Title"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-5 mb-3",
							children: /* @__PURE__ */ jsx("textarea", {
								value: formData.codeIntegrationSteps[0].description,
								onChange: (e) => handleChange(e, "codeIntegrationSteps", 0),
								name: "description",
								className: "form-control",
								rows: "1",
								placeholder: "Step Description"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-2 mb-3",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.codeIntegrationSteps[1].stepCount,
								onChange: (e) => handleChange(e, "codeIntegrationSteps", 1),
								name: "stepCount",
								type: "number",
								className: "form-control",
								placeholder: "Step Count"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-5 mb-3",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.codeIntegrationSteps[1].title,
								onChange: (e) => handleChange(e, "codeIntegrationSteps", 1),
								name: "title",
								type: "text",
								className: "form-control",
								placeholder: "Step Title"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-5 mb-3",
							children: /* @__PURE__ */ jsx("textarea", {
								value: formData.codeIntegrationSteps[1].description,
								onChange: (e) => handleChange(e, "codeIntegrationSteps", 1),
								name: "description",
								className: "form-control",
								rows: "1",
								placeholder: "Step Description"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-2 mb-3",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.codeIntegrationSteps[2].stepCount,
								onChange: (e) => handleChange(e, "codeIntegrationSteps", 2),
								name: "stepCount",
								type: "number",
								className: "form-control",
								placeholder: "Step Count"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-5 mb-3",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.codeIntegrationSteps[2].title,
								onChange: (e) => handleChange(e, "codeIntegrationSteps", 2),
								name: "title",
								type: "text",
								className: "form-control",
								placeholder: "Step Title"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-5 mb-3",
							children: /* @__PURE__ */ jsx("textarea", {
								value: formData.codeIntegrationSteps[2].description,
								onChange: (e) => handleChange(e, "codeIntegrationSteps", 2),
								name: "description",
								className: "form-control",
								rows: "1",
								placeholder: "Step Description"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-12 mb-3",
							children: /* @__PURE__ */ jsx("textarea", {
								value: formData.codeIntegrationSample,
								onChange: handleChange,
								name: "codeIntegrationSample",
								className: "form-control",
								rows: "5",
								placeholder: "Code Integration Sample"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-12 mt-4",
							children: /* @__PURE__ */ jsx("h4", { children: "Stats" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-4 mb-4",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.stats[0].value,
								onChange: (e) => handleChange(e, "stats", 0),
								name: "value",
								type: "number",
								className: "form-control",
								placeholder: "Value"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-4 mb-4",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.stats[0].unit,
								onChange: (e) => handleChange(e, "stats", 0),
								name: "unit",
								type: "text",
								className: "form-control",
								placeholder: "Unit"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-4 mb-4",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.stats[0].label,
								onChange: (e) => handleChange(e, "stats", 0),
								name: "label",
								type: "text",
								className: "form-control",
								placeholder: "Label"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-4 mb-4",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.stats[1].value,
								onChange: (e) => handleChange(e, "stats", 1),
								name: "value",
								type: "number",
								className: "form-control",
								placeholder: "Value"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-4 mb-4",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.stats[1].unit,
								onChange: (e) => handleChange(e, "stats", 1),
								name: "unit",
								type: "text",
								className: "form-control",
								placeholder: "Unit"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-4 mb-4",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.stats[1].label,
								onChange: (e) => handleChange(e, "stats", 1),
								name: "label",
								type: "text",
								className: "form-control",
								placeholder: "Label"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-4 mb-4",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.stats[2].value,
								onChange: (e) => handleChange(e, "stats", 2),
								name: "value",
								type: "number",
								className: "form-control",
								placeholder: "Value"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-4 mb-4",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.stats[2].unit,
								onChange: (e) => handleChange(e, "stats", 2),
								name: "unit",
								type: "text",
								className: "form-control",
								placeholder: "Unit"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-4 mb-4",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.stats[2].label,
								onChange: (e) => handleChange(e, "stats", 2),
								name: "label",
								type: "text",
								className: "form-control",
								placeholder: "Label"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-12 mt-4",
							children: /* @__PURE__ */ jsx("h4", { children: "Pricing Section" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-6",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.pricingSubHeading,
								onChange: handleChange,
								name: "pricingSubHeading",
								type: "text",
								className: "form-control",
								placeholder: "Pricing Sub Heading"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-md-6",
							children: /* @__PURE__ */ jsx("input", {
								value: formData.pricingHeading,
								onChange: handleChange,
								name: "pricingHeading",
								type: "text",
								className: "form-control",
								placeholder: "Pricing Heading"
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "udieiojoerr mt-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "d-flex align-items-center justify-content-between",
								children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "",
									children: "Add Plans"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: handleAddPlan,
									className: "btn btn-primary",
									children: "Add A Plan"
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "idunjeihewr",
								children: formData?.pricingPlans?.map((pricingPlan, index) => /* @__PURE__ */ jsxs("div", {
									className: "diuniejkerwr mb-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "d-flex align-items-center justify-content-between",
										children: [/* @__PURE__ */ jsxs("h4", {
											className: "mb-3",
											children: ["Plan ", index + 1]
										}), formData?.pricingPlans?.length > 1 && /* @__PURE__ */ jsx("i", {
											onClick: () => handleRemovePlan(pricingPlan?._id),
											className: "fa-regular fs-2 fa-circle-xmark text-danger"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "row mt-3",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "col-md-4 mb-4",
												children: /* @__PURE__ */ jsx("input", {
													type: "text",
													value: pricingPlan.planName,
													onChange: (e) => handleChange(e, "pricingPlans", index),
													name: "planName",
													className: "form-control",
													placeholder: "Plan Name"
												})
											}),
											/* @__PURE__ */ jsx("div", {
												className: "col-md-4 mb-4",
												children: /* @__PURE__ */ jsx("input", {
													type: "text",
													value: pricingPlan.planPurpose,
													onChange: (e) => handleChange(e, "pricingPlans", index),
													name: "planPurpose",
													className: "form-control",
													placeholder: "Plan Purpose"
												})
											}),
											/* @__PURE__ */ jsx("div", {
												className: "col-md-4 mb-4",
												children: /* @__PURE__ */ jsx("input", {
													type: "number",
													value: pricingPlan.price,
													onChange: (e) => handleChange(e, "pricingPlans", index),
													name: "price",
													className: "form-control",
													placeholder: "Price"
												})
											}),
											/* @__PURE__ */ jsx("div", {
												className: "col-md-4 mb-4",
												children: /* @__PURE__ */ jsx("input", {
													type: "text",
													value: pricingPlan.duration,
													onChange: (e) => handleChange(e, "pricingPlans", index),
													name: "duration",
													className: "form-control",
													placeholder: "Duration"
												})
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "col-md-12 mb-4",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "d-flex align-items-center justify-content-between mb-3",
													children: [/* @__PURE__ */ jsx("label", {
														htmlFor: "",
														className: "mb-0",
														children: "Plan Details"
													}), /* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => handleAddFeature(pricingPlan?._id),
														className: "btn btn-primary",
														children: "Add A Feature"
													})]
												}), pricingPlan?.planDetails?.map((planDetail, planDetailIndex) => /* @__PURE__ */ jsxs("div", {
													className: "diuewkhrwe d-flex align-items-center justify-content-between gap-4",
													children: [/* @__PURE__ */ jsx("input", {
														value: planDetail,
														onChange: (e) => handleChange(e, "pricingPlans", index, "planDetails", planDetailIndex),
														type: "text",
														className: "form-control mb-3",
														placeholder: "CTA Button"
													}), pricingPlan?.planDetails?.length > 1 && /* @__PURE__ */ jsx("i", {
														onClick: () => handleRemovePlanDetail(pricingPlan._id, planDetailIndex),
														className: "fa-regular fs-2 fa-circle-xmark text-danger"
													})]
												}, planDetailIndex))]
											})
										]
									})]
								}, index))
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-12 mt-5 text-center",
							children: /* @__PURE__ */ jsx("button", {
								className: "btn btn-primary px-5 py-3",
								children: "Submit"
							})
						})
					]
				})
			})
		]
	})] });
});
//#endregion
//#region src/pages/AboutUs.jsx
var AboutUs_exports = /* @__PURE__ */ __exportAll({
	default: () => AboutUs_default,
	loader: () => loader$2
});
async function loader$2() {
	try {
		return { aboutUsData: (await api.get("/aboutPage"))?.data?.data?.aboutPage };
	} catch (err) {
		console.log(err);
		throw new Response("Failed to load about us", { status: 500 });
	}
}
var AboutUs = () => {
	const { aboutUsData } = useLoaderData();
	const [isLoading, setIsLoading] = useState(false);
	const [aboutUsForm, setAboutUsForm] = useState({
		heroSubHeading: "",
		heroHeading: "",
		heroDescription: "",
		heroImage: "",
		whoWeAreSubHeading: "",
		whoWeAreHeading: "",
		whoWeAreDescription: "",
		whoWeAreCards: [{
			icon: "",
			title: ""
		}],
		whatWeDoSubHeading: "",
		whatWeDoHeading: "",
		whatWeDoDescription: "",
		whatWeDoCards: [{
			icon: "",
			title: "",
			description: ""
		}],
		ourMissionSubHeading: "",
		ourMissionHeading: "",
		ourMissionDescription: "",
		ourMissionStats: [{
			stat: "",
			label: ""
		}],
		...aboutUsData
	});
	const handleChange = (e, arrayName = null, index) => {
		const { name, value } = e.target;
		if (arrayName !== null) setAboutUsForm((prev) => ({
			...prev,
			[arrayName]: prev[arrayName].map((item, i) => i === index ? {
				...item,
				[name]: value
			} : item)
		}));
		else setAboutUsForm({
			...aboutUsForm,
			[name]: value
		});
	};
	const addWhoWeAreHandler = () => {
		setAboutUsForm((prev) => ({
			...prev,
			whoWeAreCards: [...prev.whoWeAreCards, {
				icon: "",
				title: ""
			}]
		}));
	};
	const deleteWhoWeAreCardHandler = (i) => {
		setAboutUsForm((prev) => ({
			...prev,
			whoWeAreCards: prev.whoWeAreCards?.filter((_, whoWeAreCardIndex) => whoWeAreCardIndex !== i)
		}));
	};
	const addWhatWeDoHandler = () => {
		setAboutUsForm((prev) => ({
			...prev,
			whatWeDoCards: [...prev.whatWeDoCards, {
				icon: "",
				title: "",
				description: ""
			}]
		}));
	};
	const deleteWhatWeDoCardHandler = (i) => {
		setAboutUsForm((prev) => ({
			...prev,
			whatWeDoCards: prev.whatWeDoCards?.filter((_, whatWeDoCardIndex) => whatWeDoCardIndex !== i)
		}));
	};
	const addNewStatHandler = () => {
		setAboutUsForm((prev) => ({
			...prev,
			ourMissionStats: [...prev.ourMissionStats, {
				stat: "",
				label: ""
			}]
		}));
	};
	const deleteOurMissionStatHandler = (i) => {
		setAboutUsForm((prev) => ({
			...prev,
			ourMissionStats: prev.ourMissionStats?.filter((_, ourMissionStatIndex) => ourMissionStatIndex !== i)
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await api.patch("/aboutPage", aboutUsForm);
			toast.success("About us page successfully updated");
		} catch (err) {
			console.log(err);
			toast.error(err?.message || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [isLoading && /* @__PURE__ */ jsx(PageLoader, {}), /* @__PURE__ */ jsx("div", {
		className: "container py-4",
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "card mb-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "card-header",
						children: /* @__PURE__ */ jsx("h2", {
							className: "mb-0",
							children: "Hero Section"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "card-body",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Hero Sub Heading"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: aboutUsForm.heroSubHeading,
									onChange: handleChange,
									name: "heroSubHeading",
									className: "form-control",
									placeholder: "Enter hero sub heading"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Hero Heading"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: aboutUsForm.heroHeading,
									onChange: handleChange,
									name: "heroHeading",
									className: "form-control",
									placeholder: "Enter hero heading"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Hero Description"
								}), /* @__PURE__ */ jsx("textarea", {
									name: "heroDescription",
									className: "form-control",
									value: aboutUsForm.heroDescription,
									onChange: handleChange,
									rows: "4",
									placeholder: "Enter hero description"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Hero Image"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									name: "heroImage",
									value: aboutUsForm.heroImage,
									onChange: handleChange,
									className: "form-control",
									placeholder: "Enter hero image"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "card mb-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "card-header",
						children: /* @__PURE__ */ jsx("h2", {
							className: "mb-0",
							children: "Who We Are"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "card-body",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Sub Heading"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: aboutUsForm.whoWeAreSubHeading,
									onChange: handleChange,
									name: "whoWeAreSubHeading",
									className: "form-control",
									placeholder: "Enter sub heading"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Heading"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: aboutUsForm.whoWeAreHeading,
									onChange: handleChange,
									name: "whoWeAreHeading",
									className: "form-control",
									placeholder: "Enter heading"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-4",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Description"
								}), /* @__PURE__ */ jsx("textarea", {
									name: "whoWeAreDescription",
									value: aboutUsForm.whoWeAreDescription,
									onChange: handleChange,
									className: "form-control",
									rows: "5",
									placeholder: "Enter description"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "d-flex align-items-center justify-content-between mb-3",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "mb-0",
									children: "Who We Are Cards"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "btn btn-primary",
									onClick: addWhoWeAreHandler,
									children: "Add +"
								})]
							}),
							aboutUsForm?.whoWeAreCards?.map((whoWeAreCard, index) => /* @__PURE__ */ jsxs("div", {
								className: "border rounded p-3 mb-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "d-flex align-items-center justify-content-between",
										children: [/* @__PURE__ */ jsxs("h5", {
											className: "mb-0",
											children: ["Card ", index + 1]
										}), aboutUsForm?.whoWeAreCards.length > 1 && /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => deleteWhoWeAreCardHandler(index),
											className: "btn btn-danger",
											children: "Delete"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mb-3",
										children: [/* @__PURE__ */ jsx("label", {
											className: "form-label",
											children: "Icon"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: whoWeAreCard?.icon,
											onChange: (e) => handleChange(e, "whoWeAreCards", index),
											name: "icon",
											className: "form-control",
											placeholder: "Enter icon"
										})]
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "form-label",
										children: "Title"
									}), /* @__PURE__ */ jsx("input", {
										type: "text",
										value: whoWeAreCard?.title,
										onChange: (e) => handleChange(e, "whoWeAreCards", index),
										name: "title",
										className: "form-control",
										placeholder: "Enter title"
									})] })
								]
							}, index))
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "card mb-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "card-header",
						children: /* @__PURE__ */ jsx("h2", {
							className: "mb-0",
							children: "What We Do"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "card-body",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Sub Heading"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: aboutUsForm.whatWeDoSubHeading,
									onChange: handleChange,
									name: "whatWeDoSubHeading",
									className: "form-control",
									placeholder: "Enter sub heading"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Heading"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: aboutUsForm.whatWeDoHeading,
									onChange: handleChange,
									name: "whatWeDoHeading",
									className: "form-control",
									placeholder: "Enter heading"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-4",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Description"
								}), /* @__PURE__ */ jsx("textarea", {
									name: "whatWeDoDescription",
									value: aboutUsForm.whatWeDoDescription,
									onChange: handleChange,
									className: "form-control",
									rows: "4",
									placeholder: "Enter description"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "d-flex align-items-center justify-content-between mb-3",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "mb-0",
									children: "What We Do Cards"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: addWhatWeDoHandler,
									className: "btn btn-primary",
									children: "Add +"
								})]
							}),
							aboutUsForm?.whatWeDoCards?.map((whatWeDoCard, index) => /* @__PURE__ */ jsxs("div", {
								className: "border rounded p-3 mb-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "d-flex align-items-center justify-content-between",
										children: [/* @__PURE__ */ jsxs("h5", {
											className: "mb-0",
											children: ["Card ", index + 1]
										}), aboutUsForm?.whatWeDoCards?.length > 1 && /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => deleteWhatWeDoCardHandler(index),
											className: "btn btn-danger",
											children: "Delete"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mb-3",
										children: [/* @__PURE__ */ jsx("label", {
											className: "form-label",
											children: "Icon"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: whatWeDoCard?.icon,
											onChange: (e) => handleChange(e, "whatWeDoCards", index),
											name: "icon",
											className: "form-control",
											placeholder: "Enter icon"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mb-3",
										children: [/* @__PURE__ */ jsx("label", {
											className: "form-label",
											children: "Title"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: whatWeDoCard?.title,
											onChange: (e) => handleChange(e, "whatWeDoCards", index),
											name: "title",
											className: "form-control",
											placeholder: "Enter title"
										})]
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "form-label",
										children: "Description"
									}), /* @__PURE__ */ jsx("textarea", {
										name: "description",
										value: whatWeDoCard?.description,
										onChange: (e) => handleChange(e, "whatWeDoCards", index),
										className: "form-control",
										rows: "3",
										placeholder: "Enter description"
									})] })
								]
							}, index))
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "card mb-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "card-header",
						children: /* @__PURE__ */ jsx("h2", {
							className: "mb-0",
							children: "Our Mission"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "card-body",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Sub Heading"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: aboutUsForm.ourMissionSubHeading,
									onChange: handleChange,
									name: "ourMissionSubHeading",
									className: "form-control",
									placeholder: "Enter sub heading"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Heading"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: aboutUsForm.ourMissionHeading,
									onChange: handleChange,
									name: "ourMissionHeading",
									className: "form-control",
									placeholder: "Enter heading"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-4",
								children: [/* @__PURE__ */ jsx("label", {
									className: "form-label",
									children: "Description"
								}), /* @__PURE__ */ jsx("textarea", {
									name: "ourMissionDescription",
									value: aboutUsForm.ourMissionDescription,
									onChange: handleChange,
									className: "form-control",
									rows: "5",
									placeholder: "Enter description"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "d-flex align-items-center justify-content-between mb-3",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "mb-0",
									children: "Mission Statistics"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: addNewStatHandler,
									className: "btn btn-primary",
									children: "Add New Stat +"
								})]
							}),
							aboutUsForm?.ourMissionStats?.map((ourMissionStat, index) => /* @__PURE__ */ jsxs("div", {
								className: "border rounded p-3 mb-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "d-flex align-items-center justify-content-between",
										children: [/* @__PURE__ */ jsxs("h5", {
											className: "mb-0",
											children: ["Statistic ", index + 1]
										}), aboutUsForm?.ourMissionStats?.length > 1 && /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => deleteOurMissionStatHandler(index),
											className: "btn btn-danger",
											children: "Delete"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mb-3",
										children: [/* @__PURE__ */ jsx("label", {
											className: "form-label",
											children: "Stat"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: ourMissionStat?.stat,
											onChange: (e) => handleChange(e, "ourMissionStats", index),
											name: "stat",
											className: "form-control",
											placeholder: "Enter stat"
										})]
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "form-label",
										children: "Label"
									}), /* @__PURE__ */ jsx("input", {
										type: "text",
										value: ourMissionStat?.label,
										onChange: (e) => handleChange(e, "ourMissionStats", index),
										name: "label",
										className: "form-control",
										placeholder: "Enter label"
									})] })
								]
							}, index))
						]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "text-center",
					children: /* @__PURE__ */ jsx("button", {
						type: "submit",
						className: "btn btn-primary px-4",
						children: "Submit"
					})
				})
			]
		})
	})] });
};
var AboutUs_default = UNSAFE_withComponentProps(AboutUs);
//#endregion
//#region src/hooks/useFormattedDate.jsx
var formatDate = (date) => {
	return new Date(date).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
};
//#endregion
//#region src/pages/Blogs.jsx
var Blogs_exports = /* @__PURE__ */ __exportAll({ default: () => Blogs_default });
var Blogs_default = UNSAFE_withComponentProps(function Blogs() {
	const [blogs, setBlogs] = useState([]);
	const [imageBaseUrl, setImageBaseUrl] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [blogDeleteAlert, setBlogDeleteAlert] = useState(null);
	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				setIsLoading(true);
				const response = await api.get("/blogs");
				setBlogs(response?.data?.data?.blogs);
				setImageBaseUrl(response?.data?.imageBaseUrl);
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchBlogs();
	}, []);
	const deleteBlogHandler = async (id) => {
		try {
			setIsLoading(true);
			await api.delete(`/blogs/${id}`);
			setBlogs((prev) => prev.filter((blog) => blog._id !== id));
			toast.success("Blog deletion successful");
		} catch (err) {
			console.log(err);
			toast.error(err?.message || "Blog deletion successful");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		isLoading && /* @__PURE__ */ jsx(PageLoader, {}),
		/* @__PURE__ */ jsxs("div", {
			className: "container py-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "dfvgfndfsbdf d-flex justify-content-between align-items-center mb-4",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "mb-0",
					children: "All Blogs"
				}), /* @__PURE__ */ jsxs("div", {
					className: "d-flex align-items-center gap-3",
					children: [/* @__PURE__ */ jsx("button", {
						className: "btn btn-success",
						children: "Upload From CSV"
					}), /* @__PURE__ */ jsx(Link, {
						to: "/create-blog",
						children: /* @__PURE__ */ jsx("button", {
							className: "btn btn-primary",
							children: "+ Create Blog"
						})
					})]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "card shadow-sm",
				children: /* @__PURE__ */ jsx("div", {
					className: "card-body",
					children: /* @__PURE__ */ jsx("div", {
						className: "table-responsive",
						children: /* @__PURE__ */ jsxs("table", {
							className: "table table-hover align-middle",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", { children: "#" }),
								/* @__PURE__ */ jsx("th", { children: "Image" }),
								/* @__PURE__ */ jsx("th", { children: "Title" }),
								/* @__PURE__ */ jsx("th", { children: "Category" }),
								/* @__PURE__ */ jsx("th", { children: "Author" }),
								/* @__PURE__ */ jsx("th", { children: "Date" }),
								/* @__PURE__ */ jsx("th", { children: "Status" }),
								/* @__PURE__ */ jsx("th", { children: "Actions" })
							] }) }), /* @__PURE__ */ jsx("tbody", { children: blogs?.map((blog, index) => /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("td", { children: index + 1 }),
								/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", {
									src: `${imageBaseUrl}/${blog?.image}`,
									alt: blog?.blogTitle,
									width: "80",
									height: "50",
									className: "rounded object-fit-cover"
								}) }),
								/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("div", {
									className: "fw-semibold",
									children: blog?.blogTitle
								}) }),
								/* @__PURE__ */ jsx("td", { children: blog?.blogCategory }),
								/* @__PURE__ */ jsx("td", { children: "Admin" }),
								/* @__PURE__ */ jsx("td", { children: formatDate(blog?.blogPostDate) }),
								/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", {
									className: "badge bg-success",
									children: "Published"
								}) }),
								/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", {
									className: "d-flex gap-2",
									children: [/* @__PURE__ */ jsx(Link, {
										to: `/blogs/${blog?._id}`,
										children: /* @__PURE__ */ jsx("button", {
											className: "btn btn-sm btn-outline-primary",
											children: "Edit"
										})
									}), /* @__PURE__ */ jsx("button", {
										"data-bs-toggle": "modal",
										"data-bs-target": "#exampleModal",
										onClick: () => setBlogDeleteAlert(blog?._id),
										className: "btn btn-sm btn-outline-danger",
										children: "Delete"
									})]
								}) })
							] }, blog?._id)) })]
						})
					})
				})
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			class: "modal fade",
			id: "exampleModal",
			tabindex: "-1",
			"aria-labelledby": "exampleModalLabel",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("div", {
				class: "modal-dialog",
				children: /* @__PURE__ */ jsxs("div", {
					class: "modal-content",
					children: [
						/* @__PURE__ */ jsxs("div", {
							class: "modal-header border-bottom-0",
							children: [/* @__PURE__ */ jsx("h1", {
								class: "modal-title fs-5",
								id: "exampleModalLabel"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								class: "btn-close",
								"data-bs-dismiss": "modal",
								"aria-label": "Close"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							class: "modal-body text-center",
							children: blogs.filter((blog) => blog?._id === blogDeleteAlert).map((blog) => /* @__PURE__ */ jsxs("h5", {
								className: "mb-0",
								children: [
									"Are you sure you want to delete this blog? - ",
									/* @__PURE__ */ jsx("br", {}),
									" ",
									/* @__PURE__ */ jsx("em", { children: /* @__PURE__ */ jsxs("b", { children: [
										"\"",
										blog?.blogTitle,
										"\""
									] }) })
								]
							}))
						}),
						/* @__PURE__ */ jsxs("div", {
							class: "modal-footer justify-content-between",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								class: "btn btn-secondary",
								"data-bs-dismiss": "modal",
								children: "Cancel"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => deleteBlogHandler(blogDeleteAlert),
								type: "button",
								class: "btn btn-danger",
								"data-bs-dismiss": "modal",
								"aria-label": "Close",
								children: "Delete"
							})]
						})
					]
				})
			})
		})
	] });
});
//#endregion
//#region src/pages/EditBlog.jsx
var EditBlog_exports = /* @__PURE__ */ __exportAll({
	default: () => EditBlog_default,
	loader: () => loader$1
});
async function loader$1({ params }) {
	try {
		const response = await api.get(`/blogs/${params.id}`);
		const responseCategory = await api.get("/blog_category");
		return {
			blogData: response?.data?.data?.blog,
			blogCategories: responseCategory?.data?.data?.blogCategory,
			imageBaseUrl: response?.data?.imageBaseUrl
		};
	} catch (err) {
		console.log(err);
		throw new Response("Failed to load edit blog", { status: 500 });
	}
}
var EditBlog = () => {
	const { blogData, blogCategories, imageBaseUrl } = useLoaderData$1();
	const [isLoading, setIsLoading] = useState(false);
	const [blog, setBlog] = useState({
		blogCategory: "",
		blogTitle: "",
		blogSlug: "",
		image: null,
		blogDescription: "",
		blogKeyTakeways: [""],
		...blogData
	});
	const [updateNewImage, setUpdateNewImage] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();
	const handleAddTakeaway = () => {
		setBlog((prev) => ({
			...prev,
			blogKeyTakeways: [...prev.blogKeyTakeways, ""]
		}));
	};
	const handleChange = (e, arrayName = null, index) => {
		const { name, value } = e.target;
		if (arrayName !== null) setBlog((prev) => ({
			...prev,
			blogKeyTakeways: prev.blogKeyTakeways.map((blogKeyTakeway, i) => i === index ? value : blogKeyTakeway)
		}));
		else setBlog({
			...blog,
			[name]: value
		});
	};
	const handleEdit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const formData = new FormData();
			formData.append("blogCategory", blog.blogCategory);
			formData.append("blogTitle", blog.blogTitle);
			formData.append("blogSlug", blog.blogSlug);
			formData.append("blogDescription", blog.blogDescription);
			formData.append("blogKeyTakeways", JSON.stringify(blog.blogKeyTakeways));
			formData.append("image", updateNewImage);
			await api.patch(`/blogs/${id}`, formData);
			console.log(formData, "hi");
			navigate(-1);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [isLoading && /* @__PURE__ */ jsx(PageLoader, {}), /* @__PURE__ */ jsx("div", {
		className: "container py-4",
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: handleEdit,
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: "mb-4",
					children: "Edit Blog"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx("label", {
						className: "form-label",
						children: "Category"
					}), /* @__PURE__ */ jsxs("select", {
						onChange: handleChange,
						className: "form-select",
						name: "blogCategory",
						id: "",
						children: [/* @__PURE__ */ jsx("option", {
							value: blog?.blogCategory,
							children: blog?.blogCategory
						}), blogCategories.filter((blogCategory) => blogCategory?.category?.toLowerCase() !== blog?.blogCategory?.toLocaleLowerCase()).map((blogCategory) => /* @__PURE__ */ jsx("option", {
							value: blogCategory?.category,
							children: blogCategory?.category
						}, blogCategory?._id))]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx("label", {
						className: "form-label",
						children: "Blog Title"
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						className: "form-control",
						name: "blogTitle",
						value: blog?.blogTitle,
						onChange: handleChange,
						placeholder: "How AI is Changing the Future"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx("label", {
						className: "form-label",
						children: "Slug"
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						className: "form-control",
						name: "slug",
						value: blog?.blogSlug,
						onChange: handleChange,
						placeholder: "how-ai-is-changing-the-future"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3",
					children: [
						/* @__PURE__ */ jsx("label", {
							className: "form-label",
							children: "Featured Image"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "file",
							className: "form-control",
							onChange: (e) => setUpdateNewImage(e.target.files[0]),
							name: "image"
						}),
						/* @__PURE__ */ jsx("img", {
							src: `${imageBaseUrl}/${blog?.image}`,
							alt: "",
							width: "150",
							className: "rounded mt-3"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "d-flex justify-content-between align-items-center mb-3",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label mb-0",
							children: "Key Takeaways"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-primary btn-sm",
							onClick: handleAddTakeaway,
							children: "+ Add Takeaway"
						})]
					}), blog?.blogKeyTakeways.map((blogKeyTakeway, index) => /* @__PURE__ */ jsxs("div", {
						className: "input-group mb-2",
						children: [/* @__PURE__ */ jsx("input", {
							type: "text",
							className: "form-control",
							name: "keyTakeaways",
							value: blogKeyTakeway,
							onChange: (e) => handleChange(e, "blogKeyTakeways", index),
							placeholder: "AI automates repetitive tasks."
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-outline-danger",
							children: "Remove"
						})]
					}, index))]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ jsx("label", {
						className: "form-label",
						children: "Blog Content"
					}), /* @__PURE__ */ jsx("textarea", {
						className: "form-control",
						rows: "12",
						name: "blogDescription",
						value: blog?.blogDescription,
						onChange: handleChange,
						placeholder: "Write your complete blog content here..."
					})]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "submit",
					className: "btn btn-success",
					children: "Submit"
				})
			]
		})
	})] });
};
var EditBlog_default = UNSAFE_withComponentProps(EditBlog);
//#endregion
//#region src/pages/CreateABlog.jsx
var CreateABlog_exports = /* @__PURE__ */ __exportAll({ default: () => CreateABlog_default });
var CreateABlog_default = UNSAFE_withComponentProps(function CreateABlog() {
	const [blogData, setBlogData] = useState({
		blogCategory: "",
		blogTitle: "",
		blogSlug: "",
		image: null,
		blogDescription: "",
		blogKeyTakeways: [""]
	});
	const [blogCategories, setBlogCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchBlogCategories = async () => {
			try {
				setIsLoading(true);
				const response = await api.get("/blog_category");
				setBlogCategories(response?.data?.data?.blogCategory);
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchBlogCategories();
	}, []);
	const handleAddTakeaway = () => {
		setBlogData((prev) => ({
			...prev,
			blogKeyTakeways: [...prev.blogKeyTakeways, ""]
		}));
	};
	const handleRemoveTakeways = (takeawayIndex) => {
		setBlogData((prev) => ({
			...prev,
			blogKeyTakeways: prev.blogKeyTakeways.filter((_, index) => takeawayIndex !== index)
		}));
	};
	const handleChange = (e, arrayName = null, index) => {
		const { name, value } = e.target;
		if (arrayName !== null) setBlogData((prev) => ({
			...prev,
			[arrayName]: prev.blogKeyTakeways.map((item, i) => i === index ? value : item)
		}));
		else {
			setBlogData((prev) => ({
				...prev,
				[name]: value
			}));
			if (name === "blogTitle") setBlogData((prev) => ({
				...prev,
				blogSlug: slugify(value, { lower: true })
			}));
		}
	};
	const submitBlogData = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const formData = new FormData();
			formData.append("blogCategory", blogData.blogCategory);
			formData.append("blogTitle", blogData.blogTitle);
			formData.append("blogSlug", blogData.blogSlug);
			formData.append("blogDescription", blogData.blogDescription);
			formData.append("blogKeyTakeways", JSON.stringify(blogData.blogKeyTakeways));
			formData.append("image", blogData.image);
			await api.post("/blogs", formData);
			toast.success("Blog submission successful");
		} catch (err) {
			console.log(err);
			toast.error(err?.message || "Something went wrong");
		} finally {
			setIsLoading(false);
			navigate(-1);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [isLoading && /* @__PURE__ */ jsx(PageLoader, {}), /* @__PURE__ */ jsx("div", {
		className: "container py-4",
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: submitBlogData,
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: "mb-4",
					children: "Create Blog"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx("label", {
						className: "form-label",
						children: "Category"
					}), /* @__PURE__ */ jsxs("select", {
						className: "form-select",
						name: "blogCategory",
						onChange: handleChange,
						children: [/* @__PURE__ */ jsx("option", { children: "Choose a category" }), blogCategories?.map((blogCategory) => /* @__PURE__ */ jsx("option", {
							value: blogCategory?.category,
							children: blogCategory?.category
						}, blogCategory?._id))]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx("label", {
						className: "form-label",
						children: "Blog Title"
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						className: "form-control",
						name: "blogTitle",
						onChange: handleChange,
						placeholder: "How AI is Changing the Future"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx("label", {
						className: "form-label",
						children: "Slug"
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						className: "form-control",
						name: "blogSlug",
						value: blogData?.blogSlug,
						onChange: handleChange,
						placeholder: "how-ai-is-changing-the-future"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx("label", {
						className: "form-label",
						children: "Featured Image"
					}), /* @__PURE__ */ jsx("input", {
						type: "file",
						className: "form-control",
						onChange: (e) => setBlogData((prev) => ({
							...prev,
							image: e.target.files[0]
						})),
						name: "image"
					})]
				}),
				/* @__PURE__ */ jsx("div", { className: "row" }),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "d-flex justify-content-between align-items-center mb-3",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label mb-0",
							children: "Key Takeaways"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-primary btn-sm",
							onClick: handleAddTakeaway,
							children: "+ Add Takeaway"
						})]
					}), blogData?.blogKeyTakeways?.map((_, index) => /* @__PURE__ */ jsxs("div", {
						className: "input-group mb-2",
						children: [/* @__PURE__ */ jsx("input", {
							type: "text",
							className: "form-control",
							name: "blogKeyTakeways",
							onChange: (e) => handleChange(e, "blogKeyTakeways", index),
							placeholder: "AI automates repetitive tasks."
						}), blogData?.blogKeyTakeways?.length > 1 && /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => handleRemoveTakeways(index),
							className: "btn btn-outline-danger",
							children: "Remove"
						})]
					}, index))]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ jsx("label", {
						className: "form-label",
						children: "Blog Content"
					}), /* @__PURE__ */ jsx("textarea", {
						className: "form-control",
						rows: "12",
						name: "blogDescription",
						onChange: handleChange,
						placeholder: "Write your complete blog content here..."
					})]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "submit",
					className: "btn btn-success",
					children: "Submit"
				})
			]
		})
	})] });
});
//#endregion
//#region src/pages/BlogCategories.jsx
var BlogCategories_exports = /* @__PURE__ */ __exportAll({ default: () => BlogCategories_default });
var BlogCategories = () => {
	const [blogCategories, setBlogCategories] = useState([]);
	const [blogCategoryDeleteAlert, setBlogCategoryDeleteAlert] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const deleteCategoryHandler = async (id) => {
		try {
			setIsLoading(true);
			await api.delete(`/blog_category/${id}`);
			setBlogCategories((prev) => prev?.filter((ctgy) => ctgy._id !== id));
			toast.success("Blog category deletion successful");
		} catch (err) {
			console.log(err);
			toast.error(err?.message || "Blog category deletion Failed");
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		const fetchBlogCategories = async () => {
			try {
				setIsLoading(true);
				const response = await api.get("/blog_category");
				setBlogCategories(response?.data?.data?.blogCategory);
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchBlogCategories();
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		isLoading && /* @__PURE__ */ jsx(PageLoader, {}),
		/* @__PURE__ */ jsxs("div", {
			className: "container py-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "d-flex justify-content-between align-items-center mb-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "mb-0",
					children: "Blog Categories"
				}), /* @__PURE__ */ jsx(Link, {
					to: "/add-blog-category",
					children: /* @__PURE__ */ jsx("button", {
						className: "btn btn-primary",
						children: "Add Category"
					})
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "card shadow-sm",
				children: /* @__PURE__ */ jsx("div", {
					className: "card-body",
					children: /* @__PURE__ */ jsx("div", {
						className: "table-responsive",
						children: /* @__PURE__ */ jsxs("table", {
							className: "table table-bordered table-hover align-middle mb-0",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "table-light",
								children: /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("th", {
										style: { width: "10%" },
										children: "#"
									}),
									/* @__PURE__ */ jsx("th", { children: "Category" }),
									/* @__PURE__ */ jsx("th", {
										style: { width: "20%" },
										children: "Actions"
									})
								] })
							}), /* @__PURE__ */ jsx("tbody", { children: blogCategories?.map((blogCategory, index) => /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("td", { children: index + 1 }),
								/* @__PURE__ */ jsx("td", { children: blogCategory?.category }),
								/* @__PURE__ */ jsxs("td", { children: [/* @__PURE__ */ jsx(Link, {
									to: `/blog-categories/${blogCategory?._id}`,
									children: /* @__PURE__ */ jsx("button", {
										className: "btn btn-sm btn-warning me-2",
										children: "Edit"
									})
								}), /* @__PURE__ */ jsx("button", {
									"data-bs-toggle": "modal",
									"data-bs-target": "#exampleModal",
									onClick: () => setBlogCategoryDeleteAlert(blogCategory?._id),
									className: "btn btn-sm btn-danger",
									children: "Delete"
								})] })
							] }, blogCategory?._id)) })]
						})
					})
				})
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			class: "modal fade",
			id: "exampleModal",
			tabindex: "-1",
			"aria-labelledby": "exampleModalLabel",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("div", {
				class: "modal-dialog",
				children: /* @__PURE__ */ jsxs("div", {
					class: "modal-content",
					children: [
						/* @__PURE__ */ jsxs("div", {
							class: "modal-header border-bottom-0",
							children: [/* @__PURE__ */ jsx("h1", {
								class: "modal-title fs-5",
								id: "exampleModalLabel"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								class: "btn-close",
								"data-bs-dismiss": "modal",
								"aria-label": "Close"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							class: "modal-body text-center",
							children: blogCategories.filter((blogCategory) => blogCategory?._id === blogCategoryDeleteAlert).map((blogCategory) => /* @__PURE__ */ jsxs("h5", {
								className: "mb-0",
								children: [
									"Do you want to delete the blog category? - ",
									/* @__PURE__ */ jsx("br", {}),
									" ",
									/* @__PURE__ */ jsx("em", { children: /* @__PURE__ */ jsxs("b", { children: [
										"\"",
										blogCategory?.category,
										"\""
									] }) })
								]
							}))
						}),
						/* @__PURE__ */ jsxs("div", {
							class: "modal-footer justify-content-between",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								class: "btn btn-secondary",
								"data-bs-dismiss": "modal",
								children: "Cancel"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => deleteCategoryHandler(blogCategoryDeleteAlert),
								type: "button",
								class: "btn btn-danger",
								"data-bs-dismiss": "modal",
								"aria-label": "Close",
								children: "Delete"
							})]
						})
					]
				})
			})
		})
	] });
};
var BlogCategories_default = UNSAFE_withComponentProps(BlogCategories);
//#endregion
//#region src/pages/EditBlogCategory.jsx
var EditBlogCategory_exports = /* @__PURE__ */ __exportAll({
	default: () => EditBlogCategory_default,
	loader: () => loader
});
async function loader({ params }) {
	if (!params.id) return { blogCategoriesData: null };
	try {
		return { blogCategoriesData: (await api.get(`/blog_category/${params.id}`))?.data?.data?.blogCategory };
	} catch (err) {
		console.log(err);
		throw new Response("Failed to load blog categories", { status: 500 });
	}
}
var EditBlogCategory = () => {
	const { blogCategoriesData } = useLoaderData$1();
	const navigate = useNavigate();
	const [blgCategoryForm, setBlogCategoryForm] = useState({
		category: "",
		...blogCategoriesData
	});
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	const handleChange = (e) => {
		setBlogCategoryForm({ category: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			if (id) {
				await api.patch(`/blog_category/${id}`, blgCategoryForm);
				toast.success("Blog category successfully updated");
			} else {
				await api.post("/blog_category", blgCategoryForm);
				toast.success("Blog category submission successful");
			}
			navigate(-1);
		} catch (err) {
			console.log(err);
			toast.error(err?.message || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [isLoading && /* @__PURE__ */ jsx(PageLoader, {}), /* @__PURE__ */ jsx("div", {
		className: "container py-4",
		children: /* @__PURE__ */ jsx("div", {
			className: "row justify-content-center",
			children: /* @__PURE__ */ jsx("div", {
				className: "col-md-8 col-lg-6",
				children: /* @__PURE__ */ jsx("div", {
					className: "card shadow-sm",
					children: /* @__PURE__ */ jsxs("div", {
						className: "card-body p-4",
						children: [/* @__PURE__ */ jsxs("h2", {
							className: "mb-4",
							children: [id ? "Edit" : "Add", " Blog Category"]
						}), /* @__PURE__ */ jsxs("form", {
							onSubmit: handleSubmit,
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "category",
									className: "form-label",
									children: "Category"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									id: "category",
									name: "category",
									className: "form-control",
									onChange: handleChange,
									value: blgCategoryForm?.category,
									placeholder: "Type a category"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "d-flex gap-2",
								children: [/* @__PURE__ */ jsx("button", {
									type: "submit",
									className: "btn btn-primary",
									children: id ? "Save Changes" : "Add Category"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "btn btn-secondary",
									onClick: () => navigate(-1),
									children: "Cancel"
								})]
							})]
						})]
					})
				})
			})
		})
	})] });
};
var EditBlogCategory_default = UNSAFE_withComponentProps(EditBlogCategory);
//#endregion
//#region src/pages/Login.jsx
var Login_exports = /* @__PURE__ */ __exportAll({ Login: () => Login });
var Login = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light",
		children: /* @__PURE__ */ jsx("div", {
			className: "card shadow border-0",
			style: { width: "400px" },
			children: /* @__PURE__ */ jsxs("div", {
				className: "card-body p-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center mb-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "fw-bold",
						children: "Admin Panel"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-muted",
						children: "Sign in to access the dashboard"
					})]
				}), /* @__PURE__ */ jsxs("form", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label fw-semibold",
							children: "Email Address"
						}), /* @__PURE__ */ jsx("input", {
							type: "email",
							className: "form-control",
							placeholder: "Enter your email"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label fw-semibold",
							children: "Password"
						}), /* @__PURE__ */ jsx("input", {
							type: "password",
							className: "form-control",
							placeholder: "Enter your password"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "d-flex justify-content-between align-items-center mb-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "form-check",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								className: "form-check-input",
								id: "rememberMe"
							}), /* @__PURE__ */ jsx("label", {
								className: "form-check-label",
								htmlFor: "rememberMe",
								children: "Remember me"
							})]
						}), /* @__PURE__ */ jsx("a", {
							href: "/",
							className: "text-decoration-none",
							children: "Forgot Password?"
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						className: "btn btn-dark w-100",
						children: "Login"
					})
				] })]
			})
		})
	});
};
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-ECkHlseB.js",
		"imports": ["/assets/jsx-runtime-cvnAX2Ol.js", "/assets/chunk-OB3PAWPO-DXxA0prP.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/root-CuSXt3ZW.js",
			"imports": [
				"/assets/jsx-runtime-cvnAX2Ol.js",
				"/assets/chunk-OB3PAWPO-DXxA0prP.js",
				"/assets/dist-WZ755GVI.js"
			],
			"css": ["/assets/root-C91nuu-s.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/Homepage": {
			"id": "pages/Homepage",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/Homepage-DzpE2hu-.js",
			"imports": [
				"/assets/jsx-runtime-cvnAX2Ol.js",
				"/assets/chunk-OB3PAWPO-DXxA0prP.js",
				"/assets/dist-WZ755GVI.js",
				"/assets/PageLoader-DMhrNSSe.js"
			],
			"css": ["/assets/Homepage-DgewNkGJ.css", "/assets/PageLoader-4HwHyMvb.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/AboutUs": {
			"id": "pages/AboutUs",
			"parentId": "root",
			"path": "about-us",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/AboutUs-BwAsvD3S.js",
			"imports": [
				"/assets/jsx-runtime-cvnAX2Ol.js",
				"/assets/chunk-OB3PAWPO-DXxA0prP.js",
				"/assets/dist-WZ755GVI.js",
				"/assets/PageLoader-DMhrNSSe.js"
			],
			"css": ["/assets/PageLoader-4HwHyMvb.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/Blogs": {
			"id": "pages/Blogs",
			"parentId": "root",
			"path": "blogs",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/Blogs-D8Dj0BBs.js",
			"imports": [
				"/assets/jsx-runtime-cvnAX2Ol.js",
				"/assets/chunk-OB3PAWPO-DXxA0prP.js",
				"/assets/dist-WZ755GVI.js",
				"/assets/PageLoader-DMhrNSSe.js"
			],
			"css": ["/assets/PageLoader-4HwHyMvb.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/EditBlog": {
			"id": "pages/EditBlog",
			"parentId": "root",
			"path": "blogs/:id",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/EditBlog-B1K8GQdG.js",
			"imports": [
				"/assets/jsx-runtime-cvnAX2Ol.js",
				"/assets/chunk-OB3PAWPO-DXxA0prP.js",
				"/assets/PageLoader-DMhrNSSe.js"
			],
			"css": ["/assets/PageLoader-4HwHyMvb.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/CreateABlog": {
			"id": "pages/CreateABlog",
			"parentId": "root",
			"path": "create-blog",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/CreateABlog-CfAsrN7D.js",
			"imports": [
				"/assets/jsx-runtime-cvnAX2Ol.js",
				"/assets/chunk-OB3PAWPO-DXxA0prP.js",
				"/assets/dist-WZ755GVI.js",
				"/assets/PageLoader-DMhrNSSe.js"
			],
			"css": ["/assets/PageLoader-4HwHyMvb.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/BlogCategories": {
			"id": "pages/BlogCategories",
			"parentId": "root",
			"path": "blog-categories",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/BlogCategories-HtVU6foQ.js",
			"imports": [
				"/assets/jsx-runtime-cvnAX2Ol.js",
				"/assets/chunk-OB3PAWPO-DXxA0prP.js",
				"/assets/dist-WZ755GVI.js",
				"/assets/PageLoader-DMhrNSSe.js"
			],
			"css": ["/assets/PageLoader-4HwHyMvb.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"add-blog-category": {
			"id": "add-blog-category",
			"parentId": "root",
			"path": "add-blog-category",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/EditBlogCategory-BB9tymc4.js",
			"imports": [
				"/assets/jsx-runtime-cvnAX2Ol.js",
				"/assets/chunk-OB3PAWPO-DXxA0prP.js",
				"/assets/dist-WZ755GVI.js",
				"/assets/PageLoader-DMhrNSSe.js"
			],
			"css": ["/assets/PageLoader-4HwHyMvb.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"edit-blog-category": {
			"id": "edit-blog-category",
			"parentId": "root",
			"path": "blog-categories/:id",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/EditBlogCategory-BB9tymc4.js",
			"imports": [
				"/assets/jsx-runtime-cvnAX2Ol.js",
				"/assets/chunk-OB3PAWPO-DXxA0prP.js",
				"/assets/dist-WZ755GVI.js",
				"/assets/PageLoader-DMhrNSSe.js"
			],
			"css": ["/assets/PageLoader-4HwHyMvb.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/Login": {
			"id": "pages/Login",
			"parentId": "root",
			"path": "login",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/Login-BDzGgSC7.js",
			"imports": ["/assets/jsx-runtime-cvnAX2Ol.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-35bdfbd3.js",
	"version": "35bdfbd3",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var server_build_exports = /* @__PURE__ */ __exportAll({
	allowedActionOrigins: () => false,
	assets: () => server_manifest_default,
	assetsBuildDirectory: () => assetsBuildDirectory,
	basename: () => "/",
	entry: () => entry,
	future: () => future,
	isSpaMode: () => false,
	prerender: () => prerender,
	publicPath: () => "/",
	routeDiscovery: () => routeDiscovery,
	routes: () => routes,
	ssr: () => true
});
var assetsBuildDirectory = "build\\client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"v8_passThroughRequests": false,
	"v8_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"pages/Homepage": {
		id: "pages/Homepage",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: Homepage_exports
	},
	"pages/AboutUs": {
		id: "pages/AboutUs",
		parentId: "root",
		path: "about-us",
		index: void 0,
		caseSensitive: void 0,
		module: AboutUs_exports
	},
	"pages/Blogs": {
		id: "pages/Blogs",
		parentId: "root",
		path: "blogs",
		index: void 0,
		caseSensitive: void 0,
		module: Blogs_exports
	},
	"pages/EditBlog": {
		id: "pages/EditBlog",
		parentId: "root",
		path: "blogs/:id",
		index: void 0,
		caseSensitive: void 0,
		module: EditBlog_exports
	},
	"pages/CreateABlog": {
		id: "pages/CreateABlog",
		parentId: "root",
		path: "create-blog",
		index: void 0,
		caseSensitive: void 0,
		module: CreateABlog_exports
	},
	"pages/BlogCategories": {
		id: "pages/BlogCategories",
		parentId: "root",
		path: "blog-categories",
		index: void 0,
		caseSensitive: void 0,
		module: BlogCategories_exports
	},
	"add-blog-category": {
		id: "add-blog-category",
		parentId: "root",
		path: "add-blog-category",
		index: void 0,
		caseSensitive: void 0,
		module: EditBlogCategory_exports
	},
	"edit-blog-category": {
		id: "edit-blog-category",
		parentId: "root",
		path: "blog-categories/:id",
		index: void 0,
		caseSensitive: void 0,
		module: EditBlogCategory_exports
	},
	"pages/Login": {
		id: "pages/Login",
		parentId: "root",
		path: "login",
		index: void 0,
		caseSensitive: void 0,
		module: Login_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { future as a, publicPath as c, server_build_exports as d, ssr as f, entry as i, routeDiscovery as l, assetsBuildDirectory as n, isSpaMode as o, server_manifest_default as p, basename as r, prerender as s, allowedActionOrigins as t, routes as u };
