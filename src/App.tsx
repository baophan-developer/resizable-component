import {PropsWithChildren, RefObject, useEffect, useRef} from "react";
import "./App.css";

type ResizableComponentProps = {
	width?: string | number;
	height?: string | number;
	containerRef?: RefObject<HTMLElement>;
};
const ResizableComponent = (props: PropsWithChildren<ResizableComponentProps>) => {
	const {children, width = 200, height = 200, containerRef} = props;

	const resizerRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const resizer = resizerRef.current;
		const main = mainRef.current;

		let onMouseUp: () => void;
		let onMouseDown: () => void;
		let onMouseMove: (e: globalThis.MouseEvent) => void;

		if (resizer && main) {
			const container = containerRef?.current;

			onMouseDown = () => {
				resizer.style.background = "red";
				if (container) {
					container.style.cursor = "e-resize";
				}
				document.addEventListener("mousemove", onMouseMove);
			};

			onMouseUp = () => {
				resizer.style.background = "grey";
				if (container) {
					container.style.cursor = "unset";
				}
				document.removeEventListener("mousemove", onMouseMove);
			};

			onMouseMove = (e: globalThis.MouseEvent) => {
				const posPointer = e.clientX;
				const oldWidth = Math.floor(main.getBoundingClientRect().width);
				const posElementX = Math.floor(main.getBoundingClientRect().x);

				const bodyElement = document.getElementsByTagName("body")[0];
				const widthLimit = Math.floor(bodyElement.getBoundingClientRect().width);

				if (posPointer >= widthLimit) return;
				if (posPointer <= posElementX) return;

				let newWidth: number = 0;

				if (posPointer >= oldWidth) {
					newWidth = posPointer - posElementX;
				} else {
					newWidth = posElementX + posPointer;
				}

				main.style.width = `${newWidth}px`;
			};

			resizer.addEventListener("mousedown", onMouseDown);
			resizer.addEventListener("mouseup", onMouseUp);
			document.addEventListener("mouseup", onMouseUp);
		}

		return () => {
			if (resizer) {
				resizer.removeEventListener("mousedown", onMouseDown);
				resizer.removeEventListener("mouseup", onMouseUp);
			}
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, [containerRef]);

	return (
		<div
			style={{
				width: "auto",
				height: "fit-content",
				display: "flex",
			}}
		>
			<div
				ref={mainRef}
				style={{
					width: `${width}px`,
					height: `${height}px`,
					padding: "10px",
					background: "yellow",
				}}
			>
				{children}
			</div>
			<div
				ref={resizerRef}
				style={{
					width: "3px",
					height: `${height}px`,
					cursor: "e-resize",
					background: "grey",
				}}
			/>
		</div>
	);
};

function App() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<ResizableComponent containerRef={containerRef}></ResizableComponent>
		</div>
	);
}

export default App;
