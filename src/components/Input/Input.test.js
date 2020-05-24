import React from "react";
import { create } from "react-test-renderer";
import {Input} from "../index";

describe("Input component", () => {
    test("after creating component input should be diplayed", () => {
        const component = create(<Input />);
        const root = component.root;
        let input = root.findByType('input');
        expect(input).not.toBeNull()
    });
    test("after creating component input should contain Point", () => {
        const component = create(<Input value="Point" />);
        const root = component.root;
        let input = root.findByType('input');
        expect(input.props.value).toBe("Point")
    });
});