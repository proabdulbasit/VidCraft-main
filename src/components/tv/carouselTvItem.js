"use client";

import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import { Card, Col, Row, Button, Text, Loading } from "@nextui-org/react";

export default function CarouselItem(props) {
  const selectAvatar = (index) => {
    props.sendIndex(index);
  };

  useEffect(() => {}, []);

  return (
    <div>
      {props.item && (
        <Paper>
          <Card
            isPressable
            isHoverable
            css={{ w: "100%", h: "400px" }}
            onClick={() => selectAvatar(props.index)}
          >
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text
                  size={12}
                  weight="bold"
                  transform="uppercase"
                  color="#ffffffAA"
                >
                  New
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={props.item.url}
                width="100%"
                height="100%"
                objectFit="cover"
                alt="Card example background"
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop:
                  "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <Row>
                <Col>
                  <Text
                    color="#000"
                    size={22}
                    weight="bold"
                    css={{
                      paddingLeft: "10px",
                    }}
                  >
                    {props.item?.name}
                  </Text>
                </Col>
                <Col css={{ cursor: "pointer" }}>
                  <Row justify="flex-end">
                    <Button
                      flat
                      auto
                      rounded
                      color="primary"
                      style={{
                        background: props.isSelected && "#bcecbc",
                      }}
                      onClick={() => selectAvatar(props.index)}
                    >
                      <Text
                        css={{ color: "primary" }}
                        style={{
                          color: props.isSelected && "#55bd54",
                        }}
                        size={12}
                        weight="bold"
                        transform="uppercase"
                      >
                        {props.isSelected ? "Done" : "Select Tv"}
                      </Text>
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Paper>
      )}
    </div>
  );
}
